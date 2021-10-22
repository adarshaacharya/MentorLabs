import { Tag } from 'antd';
import { MentorshipRequestStatus } from 'enums';

type StatusTagProps = {
  status: MentorshipRequestStatus;
};

export const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  switch (status) {
    case MentorshipRequestStatus.PENDING:
      return <Tag color="processing">{status}</Tag>;

    case MentorshipRequestStatus.APPROVED:
      return <Tag color="success">{status}</Tag>;

    case MentorshipRequestStatus.REJECTED:
      return <Tag color="error">{status}</Tag>;

    default:
      return <p>Loading tag..</p>;
  }
};
