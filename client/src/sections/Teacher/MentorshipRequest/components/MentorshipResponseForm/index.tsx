import { Button, Card, DatePicker, Divider, Form, Input, Space, Typography } from 'antd';
import config from 'config';
import { useAppDispatch, useAppSelector } from 'hooks';
import moment from 'moment';
import * as React from 'react';
import { useParams } from 'react-router';
import { createMentorshipResponse } from 'store/mentorship/mentorship.action';
import { MentorshipResponseData, RoomInfo } from 'types';
import http from 'utils/http';
import { displayErrorMessage, displaySuccessNotification } from 'utils/notifications';

const { Item } = Form;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const UUID_PATTERN = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

export const MentorshipResponseForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { request } = useAppSelector((state) => state.mentorship);
  const [form] = Form.useForm();

  const [roomId, setRoomId] = React.useState('');
  const { id } = useParams();

  const onCreateRoomLink = async () => {
    const values = { creatorId: user.id, participantId: request.menteeId, title: 'Random title' };
    const url = config.endpoints.room.createRoom;
    const { data } = await http.post<RoomInfo>(url, values);
    setRoomId(data.id);
  };

  React.useEffect(() => {
    form.setFieldsValue({ roomId: roomId });
  }, [roomId]);

  const onFinish = (values: MentorshipResponseData) => {
    const date = moment(values.date).format('LL');
    const startTime = moment(values.startTime).format('LT');
    const endTime = moment(values.endTime).format('LT');

    const response = { ...values, date, startTime, endTime };
    dispatch(createMentorshipResponse({ id, response }));
  };

  const suffixSelector = (
    <div className="mentorship-response-form__create-link" onClick={onCreateRoomLink}>
      Create Room
    </div>
  );

  return (
    <Card className="mentorship-response-form">
      <Divider orientation="left">
        <Title level={4}>Respond Mentorship Request.</Title>
      </Divider>
      <Paragraph type="secondary">
        You've accepted request, so respond the mentee with the details about the event. Please place the details
        clearly so it won't create confusion in either end.
      </Paragraph>
      <Form
        form={form}
        name="mentorship-response-form"
        autoComplete="off"
        layout="vertical"
        size="large"
        onFinish={onFinish}
      >
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
          name="roomId"
          label="Room Identifier"
          rules={[
            {
              required: true,
              message: "You can't leave room id empty!",
            },
            {
              pattern: UUID_PATTERN,
              message: 'Enter valid room id!.',
            },
          ]}
        >
          <Input placeholder="Enter created room id" addonAfter={suffixSelector} />
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
