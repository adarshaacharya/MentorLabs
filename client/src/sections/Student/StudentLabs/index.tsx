import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, Divider, Input, Row, Typography, Form, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;

const videoPlaceholder =
  'https://images.unsplash.com/photo-1603216852884-4160b4e7d229?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80';

export const StudentLabs = () => {
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
                <Card>
                  <Form layout="vertical" size="large" className="py-2">
                    <Title level={5}>Create New Room</Title>
                    <Form.Item
                      label="Room Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input room name!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Button block type="primary" htmlType="submit">
                      create new room
                    </Button>
                  </Form>
                  <Paragraph type="secondary">
                    Room name is used to show title of your lab. The room id will be automatically generated for you
                    which will be used to join the room.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </div>
  );
};
