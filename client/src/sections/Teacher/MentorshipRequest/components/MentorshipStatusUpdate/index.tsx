import { Button, Space } from 'antd';
import { MentorshipRequestStatus } from 'enums';
import { useAppDispatch } from 'hooks';
import { useParams } from 'react-router';
import { updateMentorshipRequestStatus } from 'store/mentorship/mentorship.action';
import { displaySuccessNotification } from 'utils/notifications';

export const MentorshipStatusUpdate = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const handleAcceptRequest = () => {
    dispatch(updateMentorshipRequestStatus({ id, status: MentorshipRequestStatus.APPROVED }));
    displaySuccessNotification('Request Accepted', 'Please fillup form below with the details of the session.');
  };

  const handleRejectRequest = () => {
    dispatch(updateMentorshipRequestStatus({ id, status: MentorshipRequestStatus.REJECTED }));
    displaySuccessNotification('Mentorship rejected successfully.');
  };

  return (
    <Space size="large" className="mt-1">
      <button className="bg-success accept-request-btn" onClick={handleAcceptRequest}>
        Accept Request
      </button>
      <Button danger onClick={handleRejectRequest}>
        Reject Request
      </Button>
    </Space>
  );
};
