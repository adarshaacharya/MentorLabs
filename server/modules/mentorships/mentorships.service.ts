import { UserRepository } from '../users/repositories/users.repository';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BadRequest } from '../../common/exceptions';
import { CreateMentorshipInput } from './dtos/create-mentorship.dto';
import { Mentorship } from './entity/mentorship.entity';

@Service()
export class MentorshipsService {
  constructor(
    @InjectRepository(Mentorship)
    private readonly mentorshipRepository: Repository<Mentorship>,
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
   * Finds a mentorship by id
   * @param id
   */
  public async findMentorshipById(id: number) {
    const mentorship = this.mentorshipRepository.findOne({ where: { id } });
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
