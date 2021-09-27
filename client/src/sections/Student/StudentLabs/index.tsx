import { Card, Col, Divider, Radio, RadioChangeEvent, Row, Typography } from 'antd';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { CreateRoom, JoinRoom } from './components';
const { Title, Paragraph, Text } = Typography;

const videoPlaceholder =
  'https://images.unsplash.com/photo-1603216852884-4160b4e7d229?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80';

type Tab = 'create' | 'join';

export const StudentLabs = () => {
  const [tab, setTab] = React.useState<Tab>('create');
  const [stream, setStream] = React.useState<MediaStream>();
  const videoRef = React.useRef<HTMLVideoElement>();

  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      if (videoRef.current) videoRef.current.srcObject = currentStream;
    });
  }, []);

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
                <div className="join-labs__video">
                  {stream ? (
                    <video playsInline muted ref={videoRef} autoPlay />
                  ) : (
                    <img src={videoPlaceholder} alt="avatar" />
                  )}
                </div>
              </Col>

              <Col span={10}>
                <Card className="join-labs__form my-1 py-1">
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
