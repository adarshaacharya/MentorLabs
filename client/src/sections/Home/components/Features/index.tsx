import { Card, Col, Row, Typography } from 'antd';
import { FaVideo } from 'react-icons/fa';
import { GiProcessor } from 'react-icons/gi';
import { ImProfile } from 'react-icons/im';
const { Title, Paragraph, Text, Link } = Typography;

export const Features = () => {
  return (
    <div className="features">
      <div className="container">
        <div className="features__header">
          <Title>Empower your learning. </Title>
          <Paragraph>
            We try to build the platform with best possible infrastructures so that you can enjoy your teaching and
            learning experience with ease.
          </Paragraph>
        </div>
        <Row className="features__cards">
          <Col span={8}>
            <Card className="features__card">
              <div className="features__card--icon">
                <ImProfile size="5em" />
              </div>
              <p className="features__card--title">Complete Profile</p>
              <Paragraph>Fill out all the details and feed the algorithms with your details.</Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="features__card">
              <div className="features__card--icon">
                <GiProcessor size="5em" />
              </div>
              <p className="features__card--title">Get Recommendations</p>
              <Paragraph>Our powerful algorithms will recommend you best mentor.</Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="features__card">
              <div className="features__card--icon">
                <FaVideo size="5em" />
              </div>
              <p className="features__card--title">Sechedule Meeting</p>
              <Paragraph>Select your favourite mentor and schedule class on single click.</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
