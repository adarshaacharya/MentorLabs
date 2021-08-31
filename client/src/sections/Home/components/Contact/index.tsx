import { Row, Typography, Col } from 'antd';
import contact from '../../assets/contact.svg';
const { Title, Paragraph } = Typography;

export const Contact = () => {
  return (
    <div className="contact">
      <div className="container">
        <Row>
          <Col span={16}>
            <div className="contact__body">
              <Title>Connect with us.</Title>
              <Paragraph>
                We want to hear your thoughts! If you have any suggestions and feedback feel free to write us an email
                at
                <a href="mailto:adarshaofficial@gmail.com"> adarshaofficial@gmail.com.</a>
              </Paragraph>
              <Paragraph>
                This project is totally open-source so, if you found any problems raise issues on our{' '}
                <a href="https://github.com/adarshaacharya/MentorLabs/issues/new" target="_blank" rel="noreferrer">
                  GitHub repo
                </a>
                .
              </Paragraph>
            </div>
          </Col>
          <Col span={8}>
            <div className="contact__img">
              <img src={contact} alt="contact" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
