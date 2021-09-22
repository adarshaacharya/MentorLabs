import { StatusTag } from 'core-ui';
import moment from 'moment';
import { MentorshipRequest } from 'types';

type MentorshipRequestDetailsProps = {
  request: MentorshipRequest;
};

export const StudentMentorshipRequestDetails: React.FC<MentorshipRequestDetailsProps> = ({ request }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Title</th>
          <td>{request.title}</td>
        </tr>
        <tr>
          <th>Background</th>
          <td>{request.background}</td>
        </tr>
        <tr>
          <th>Expectations</th>
          <td>{request.expectation}</td>
        </tr>
        <tr>
          <th>Message</th>
          <td>{request.message}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td>
            <StatusTag status={request.status} />
          </td>
        </tr>
        <tr>
          <th>Submision Date</th>
          <td>{moment(request.createdAt).format('MMMM Do YYYY, h:mm a')}</td>
        </tr>
        <tr>
          <th>Mentor</th>
          <td>{request.mentorId}</td>
        </tr>
        <tr>
          <th>Mentee</th>
          <td>{request.menteeId}</td>
        </tr>
      </tbody>
    </table>
  );
};
