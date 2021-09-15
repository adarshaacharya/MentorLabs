import { Button, Form, Input, Modal, Typography } from 'antd';
import { useAppDispatch, useModal } from 'hooks';
import { useParams } from 'react-router';
import { sendMentorshipRequest } from 'store/mentorship/mentorship.slice';
import { MentorshipRequestData } from 'types';

const { Item } = Form;
const { TextArea } = Input;
const { Text } = Typography;

type MentorshipRequestFormProps = {
  visible: boolean;
  closeModal: () => void;
  handleMentorshipRequest: (values: MentorshipRequestData) => void;
};

const MentorshipRequestForm: React.FC<MentorshipRequestFormProps> = ({
  visible,
  handleMentorshipRequest,
  closeModal,
}) => {
  const [form] = Form.useForm();

  const onFormSubmit = () => {
    form.validateFields().then((values: MentorshipRequestData) => {
      form.resetFields();
      handleMentorshipRequest(values);
    });
  };

  return (
    <Modal
      title="Mentorship Request Application"
      visible={visible}
      onOk={onFormSubmit}
      onCancel={closeModal}
      width={900}
      footer={[
        <Button key="back" onClick={closeModal}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={onFormSubmit}>
          Send Request
        </Button>,
      ]}
    >
      <Form form={form} size="large" layout="vertical" name="mentorship-request-form">
        <Item
          name="background"
          label="My background"
          rules={[
            {
              required: true,
              message: "You can't leave background empty!",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Tell mentor about yourself." />
        </Item>
        <Item
          name="expectation"
          label="My expectations"
          rules={[
            {
              required: true,
              message: "You can't leave expectations empty!",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Waht do you expect from this mentorship?" />
        </Item>
        <Item
          name="message"
          label="Message"
          rules={[
            {
              required: true,
              message: "You can't leave message empty!",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Anything else you want to say?" />
        </Item>
        <Text type="secondary">
          👉 Please fill up relevant details so that mentor will understand who you are and what you are looking for.
        </Text>
      </Form>
    </Modal>
  );
};

export const ProfileMentorshipRequest = () => {
  const { closeModal, showModal, visible } = useModal(false);
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const handleMentorshipRequest = (values: MentorshipRequestData) => {
    dispatch(sendMentorshipRequest({ values, mentorId: id }));
    closeModal();
  };

  return (
    <div className="profile-mentorship-request">
      <Button type="primary" onClick={showModal}>
        Apply For Mentorship
      </Button>

      <MentorshipRequestForm
        visible={visible}
        handleMentorshipRequest={handleMentorshipRequest}
        closeModal={closeModal}
      />
    </div>
  );
};
