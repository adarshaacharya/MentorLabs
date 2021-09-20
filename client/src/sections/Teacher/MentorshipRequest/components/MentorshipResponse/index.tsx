import { Button, Card, DatePicker, Divider, Form, Input, Space, Typography } from 'antd';
import { MentorshipResponseData } from 'types';

const { Item } = Form;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export const MentorshipResponse = () => {
  const onFinish = (values: MentorshipResponseData) => {
    console.log('Success:', values);
  };

  return (
    <Card className="mentorship-response-form">
      <Divider orientation="left">
        <Title level={4}>Respond Mentorship Request.</Title>
      </Divider>
      <Paragraph type="secondary">
        You've accepted request, so respond the mentee with the details about the event. Please place the details
        clearly so it won't create confusion in either end.
      </Paragraph>
      <Form name="mentorship-response-form" autoComplete="off" layout="vertical" size="large" onFinish={onFinish}>
        <Item
          name="date"
          label="Date"
          rules={[
            {
              required: true,
              message: "You can't leave date empty!",
            },
          ]}
        >
          <DatePicker picker="date" placeholder="Select date" />
        </Item>
        <Space size="large">
          <Item
            name="startTime"
            label="Start Time"
            rules={[
              {
                required: true,
                message: "You can't leave start time empty!",
              },
            ]}
          >
            <DatePicker picker="time" placeholder="Select start time" />
          </Item>
          <Item
            name="endTime"
            label="End Time"
            rules={[
              {
                required: true,
                message: "You can't leave end time empty!",
              },
            ]}
          >
            <DatePicker picker="time" placeholder="Select end time" />
          </Item>
        </Space>
        <Item
          name="link"
          label="Session Link"
          rules={[
            {
              required: true,
              message: "You can't leave link empty!",
            },
            {
              type: 'url',
              message: 'Enter valid url!.',
            },
          ]}
        >
          <Input placeholder="https://mentorlabs.com/xyz" />
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
          <TextArea rows={4} placeholder="Extra info about event." />
        </Item>
        <Button type="primary" htmlType="submit">
          Submit Response
        </Button>
      </Form>
    </Card>
  );
};
