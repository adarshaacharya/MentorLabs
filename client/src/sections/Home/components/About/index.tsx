import aboutImg from '../../assets/about.svg';
import { Row, Typography, Col } from 'antd';

const { Title, Paragraph } = Typography;

export const About = () => {
  return (
    <div className="about">
      <div className="container">
        <Row>
          <Col span={14} className="about__info">
            <Title>Our Mission and Values.</Title>
            <Paragraph>
              Metor Labs is a free and open-source platform for connecting the subject experts with the students all
              around the globe. When everything was going in virtual mode in the pandemic times, we feel that the
              learning process should also pave on the same direction.
            </Paragraph>

            <Paragraph>
              We strongly belive that geographical and financial barrier shouldn't stop anyone in learning process. So,
              this platform is the result of the experiments and the sheer necessity to solve the problems of mentorship
              in the educational sector.
            </Paragraph>

            <Paragraph>
              We have hundreds of experts from Computer Science and Technology domains willing to mentor the students.
              If you are student join us via Student category and if you want to mentor the students join us via Teacher
              category.
            </Paragraph>
          </Col>
          <Col span={8}>
            <div className="about__img">
              <img src={aboutImg} alt="about" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
