import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BadRequest, NotFound, Unauthorized } from '../../common/exceptions';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/repositories/users.repository';
import { CreateMentorshipInput } from './dtos/create-mentorship.dto';
import { CreateResponseInput } from './dtos/create-response.dto';
import { UpdateRequestStatusInput } from './dtos/update-request-status';
import { Mentorship } from './entities/mentorship.entity';
import { Response } from './entities/response.entity';

@Service()
export class MentorshipsService {
  constructor(
    @InjectRepository(Mentorship)
    private readonly mentorshipRepository: Repository<Mentorship>,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,
  ) {}

  /**
   * Creates a new mentorship request
   * @param mentorshipDto user's mentorship request
   */
  public async createMentorship(createMentorshipInput: CreateMentorshipInput): Promise<void> {
    const { mentorId, menteeId } = createMentorshipInput;
    const mentor = await this.userRepository.findOne(mentorId);

    if (!mentor) {
      throw new BadRequest('Mentor not found');
    }

    const isMentor = await this.userRepository.isMentor(mentorId);

    if (!isMentor) {
      throw new BadRequest("The user requested isn't mentor");
    }

    if (mentorId === menteeId) {
      throw new BadRequest(`Are you planning to mentor yourself?`);
    }

    const mentorshipExists = await this.findMentorship(mentorId, menteeId);

    if (mentorshipExists) {
      throw new BadRequest('A mentorship request already exists');
    }

    await this.mentorshipRepository.save(this.mentorshipRepository.create(createMentorshipInput));
  }

  /**
   * Finds all mentorship requests received by a teacher
   * @param userId
   */
  public async getMentorshipRequestsOfMentor(userId: string): Promise<Mentorship[]> {
    // Get the mentorship requests from and to to that user
    const mentorshipRequests: Mentorship[] = await this.mentorshipRepository.find({
      where: {
        mentorId: userId,
      },
      relations: ['mentee'], // also give info about mentee (who send req)
    });
    return mentorshipRequests;
  }

  /**
   * Finds all mentorship requests send by user
   * @param userId
   */
  public async getMentorshipRequestsByMentee(userId: string): Promise<Mentorship[]> {
    const mentorshipRequests: Mentorship[] = await this.mentorshipRepository.find({
      where: {
        menteeId: userId,
      },
      relations: ['mentor'],
    });
    return mentorshipRequests;
  }

  /**
   * Finds a mentorship by id
   * @param id
   */
  public async findMentorshipById(id: string, currentId: string) {
    const mentorship = await this.mentorshipRepository.findOne({ where: { id }, relations: ['response'] });

    if (!mentorship) {
      throw new NotFound('Mentorship  request with given id not found');
    }

    if (currentId !== mentorship.menteeId && currentId !== mentorship.mentorId) {
      throw new Unauthorized('You are not allowed to view other requests');
    }

    return mentorship;
  }

  /**
   * update status of req
   * @param newstatus, id
   */
  public async updateMentorshipRequestStatus(mentorshipId: string, updateRequestStatusInput: UpdateRequestStatusInput) {
    const mentorship = await this.mentorshipRepository.findOne({ where: { id: mentorshipId } });

    if (!mentorship) {
      throw new NotFound('Mentorship  request with given id not found');
    }

    const { status } = updateRequestStatusInput;

    const response = await this.mentorshipRepository.save({ ...mentorship, status });

    return response;
  }

  /**
   * creates response for mentorship req
   * @param id
   */
  public async createMentorshipResponse(mentorshipId: string, createResponseInput: CreateResponseInput) {
    const mentorship = await this.mentorshipRepository.findOne({ where: { id: mentorshipId } });

    if (!mentorship) {
      throw new NotFound('Mentorship  request with given id not found');
    }

    const responseExists = await this.responseRepository.findOne({ where: { mentorshipId } });

    if (responseExists) {
      throw new BadRequest('Response for given mentorship is already done.');
    }

    const response = await this.responseRepository.save(
      this.responseRepository.create({ mentorshipId, ...createResponseInput }),
    );

    return response;
  }

  /**
   * Finds a mentorship between a mentor and mentee
   * @param mentorId
   * @param menteeId
   */
  public async findMentorship(mentorId: string, menteeId: string): Promise<Mentorship | undefined> {
    const mentorship = this.mentorshipRepository.findOne({
      where: {
        menteeId,
        mentorId,
      },
    });
    return mentorship;
  }
}
