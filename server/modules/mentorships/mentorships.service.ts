import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CreateMentorshipInput, CreateMentorshipOutput } from './dtos/create-mentorship.dto';
import { Mentorship } from './entity/mentorship.entity';

@Service()
export class MentorshipsService {
  constructor(
    @InjectRepository(Mentorship)
    private readonly mentorshipRepository: Repository<Mentorship>,
  ) {}

  public async createMentorship(createMentorshipInput: CreateMentorshipInput): Promise<CreateMentorshipOutput> {
    await this.mentorshipRepository.save(this.mentorshipRepository.create(createMentorshipInput));
    return {
      ok: true,
    };
  }
}
