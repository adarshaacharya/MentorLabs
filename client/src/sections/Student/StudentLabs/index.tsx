import { Button, Card, Col, Divider, Form, Input, Radio, RadioChangeEvent, Row, Typography } from 'antd';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
const { Title, Paragraph, Text } = Typography;

const videoPlaceholder =
  'https://images.unsplash.com/photo-1603216852884-4160b4e7d229?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80';

type Tab = 'create' | 'join';

const CreateRoom = () => {
  return (
    <div>
      <Form layout="vertical" size="large" className="py-1">
        <Form.Item
          label="Room Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input room title!',
            },
          ]}
        >
          <Input placeholder="meaningful room title.." />
        </Form.Item>
        <Button block type="primary" htmlType="submit">
          create room
        </Button>
      </Form>
      <Text type="secondary">
        The room title is used to show title of your session. Room id will be automatically generated for you.
      </Text>
    </div>
  );
};

const JoinRoom = () => {
  return (
    <div>
      <Form layout="vertical" size="large" className="py-1">
        <Form.Item
          label="Room ID"
          name="id"
          rules={[
            {
              required: true,
              message: 'Please input room ID!',
            },
          ]}
        >
          <Input placeholder="unique room id.." />
        </Form.Item>
        <Button block type="primary" htmlType="submit">
          join room
        </Button>
      </Form>
      <Text type="secondary">Join using unique room id created for each session by our labs.</Text>
    </div>
  );
};

export const StudentLabs = () => {
  const [tab, setTab] = React.useState<Tab>('create');

  const handleTabChange = (e: RadioChangeEvent) => {
    setTab(e.target.value);
  };

  const tabFormElement = tab === 'create' ? <CreateRoom /> : <JoinRoom />;

  return (
    <div className="student-labs">
      <Helmet>
        <title>Student Labs</title>
      </Helmet>

      <div className="container">
        <Divider orientation="left">
          <Title level={4}>Student Labs.</Title>
        </Divider>
        <Paragraph type="secondary">
          Make sure you have camera properly setup before joining labs. We highly recommend you to use Chrome or Firefox
          latest edition. Disable shield if you are using Brave browser.
        </Paragraph>

        <div className="join-labs__container">
          <Card className="join-labs__card">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={14}>
                <div className="join-labs__avatar">
                  <img src={videoPlaceholder} alt="avatar" style={{ borderRadius: '5px', maxWidth: '100%' }} />
                </div>
              </Col>

              <Col span={10}>
                <Card className="my-1 py-2">
                  <Radio.Group defaultValue="create" onChange={handleTabChange} value={tab}>
                    <Radio.Button value="create">Create a new room</Radio.Button>
                    <Radio.Button value="join">Join an existing room</Radio.Button>
                  </Radio.Group>

                  <div>{tabFormElement}</div>
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </div>
  );
};
