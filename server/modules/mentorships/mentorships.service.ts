import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BadRequest, NotFound, Unauthorized } from '../../common/exceptions';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/repositories/users.repository';
import { CreateMentorshipInput } from './dtos/create-mentorship.dto';
import { Mentorship } from './entity/mentorship.entity';

@Service()
export class MentorshipsService {
  constructor(
    @InjectRepository(Mentorship)
    private readonly mentorshipRepository: Repository<Mentorship>,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,
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
  public async getMentorshipRequestsOfMentor(userId: number): Promise<Mentorship[]> {
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
  public async getMentorshipRequestsByMentee(userId: number): Promise<Mentorship[]> {
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
  public async findMentorshipById(id: number, currentId: number) {
    const mentorship = await this.mentorshipRepository.findOne({ where: { id } });

    if (!mentorship) {
      throw new NotFound('Mentorship  request with given id not found');
    }
    if (currentId !== mentorship.menteeId || currentId !== mentorship.mentorId) {
      throw new Unauthorized('You are not allowed to view other requests');
    }
    return mentorship;
  }

  /**
   * Finds a mentorship between a mentor and mentee
   * @param mentorId
   * @param menteeId
   */
  public async findMentorship(mentorId: number, menteeId: number): Promise<Mentorship | undefined> {
    const mentorship = this.mentorshipRepository.findOne({
      where: {
        menteeId,
        mentorId,
      },
    });
    return mentorship;
  }
}
