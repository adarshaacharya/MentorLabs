import { Form, Input, Button, Checkbox, Divider, Typography } from 'antd';

interface MentorshipResponseData {
  date: Date;
  startTime: string;
  endTime: string;
  link: string;
  message: string;
}

const { Item } = Form;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export const MentorshipResponse = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="mentorship-response-form">
      <Divider orientation="left">
        <Title level={4}>Respond Mentorship Request.</Title>
      </Divider>
      <Paragraph type="secondary">
        Respond the mentee with the details about the event. Please place the details clearly so it won't create
        confusion in either end.
      </Paragraph>
      <Form
        name="mentorship-response-form"
        autoComplete="off"
        layout="vertical"
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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
    </div>
  );
};
