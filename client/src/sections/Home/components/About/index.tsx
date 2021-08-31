import { Card, Col, Row, Typography } from 'antd';
import { FaVideo } from 'react-icons/fa';
import { GiProcessor } from 'react-icons/gi';
import { ImProfile } from 'react-icons/im';
const { Title, Paragraph, Text, Link } = Typography;

export const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about__header">
          <Title>Explore. </Title>
          <Paragraph>
            Empower your business with all the right tools to accept online payments and provide the best customer
            experience.
          </Paragraph>
        </div>
        <Row className="about__features">
          <Col span={8}>
            <Card className="about__card">
              <div className="about__card--icon">
                <ImProfile size="5em" />
              </div>
              <p className="about__card--title">Complete Profile</p>
              <Paragraph>Fill out all the details and feed the algorithms with your details.</Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="about__card">
              <div className="about__card--icon">
                <GiProcessor size="5em" />
              </div>
              <p className="about__card--title">Get Recommendations</p>
              <Paragraph>Our powerful algorithms will recommend you best mentor.</Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="about__card">
              <div className="about__card--icon">
                <FaVideo size="5em" />
              </div>
              <p className="about__card--title">Sechedule Meeting</p>
              <Paragraph>Select your favourite mentor and schedule class on single click.</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
