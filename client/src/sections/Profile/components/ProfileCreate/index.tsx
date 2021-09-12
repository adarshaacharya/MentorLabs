import { Button, Form, Input, Typography } from 'antd';
import AntdInputTag from 'antd-input-tag';

import * as React from 'react';
import { CreateProfileData } from 'types';
import { displayErrorMessage } from 'utils/notifications';

const { Item } = Form;
const { Title, Text } = Typography;

export const ProfileCreate = () => {
  const handleCreateProfile = (values: CreateProfileData) => {
    console.log(values);
  };

  const onFinishFailed = (error) => {
    displayErrorMessage('Please complete all required form fields!');
    return;
  };

  return (
    <div className="profile-create">
      <div className="container">
        <Form layout="vertical" onFinish={handleCreateProfile} onFinishFailed={onFinishFailed}>
          <div className="profile-create__form-header">
            <Title level={3} className="profile-create__form-title">
              Hi! Let's get started filling your profile information.
            </Title>
            <Text type="secondary">
              In this form, we'll collect some basic and additional information about you. Your data is feed in our
              algorithm to recommend other users, so make sure that information entered is correct. 👇
            </Text>
          </div>

          <Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter what defines your title!' }]}
          >
            <Input placeholder="Software Engineer" />
          </Item>

          <Item
            label="Description"
            extra="Max character count of 400"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please describe about you in short!',
              },
            ]}
          >
            <Input.TextArea
              rows={3}
              maxLength={400}
              placeholder="Software engineer with 10+ years of experience in Machie Learning, Cloud Computing and BlockChain."
            />
          </Item>

          <Item
            label="Country"
            name="country"
            rules={[
              {
                required: true,
                message: 'Please enter a country you are from!',
              },
            ]}
          >
            <Input placeholder="Nepal" />
          </Item>

          <Item
            label="Tags"
            name="tags"
            rules={[
              {
                required: true,
                message: 'Enter at least 4 tags that describes you!',
              },
            ]}
          >
            <Input placeholder="compiler cloud networking" />
          </Item>

          <Item
            label="Languages"
            name="languages"
            rules={[
              {
                required: true,
                message: 'Enter your languages which you are fluent with!',
              },
            ]}
          >
            <Input placeholder="french nepali" />
          </Item>

          <Item
            label="Channels"
            name="channels"
            rules={[
              {
                required: true,
                message: 'Enter links of your channels!',
              },
            ]}
          >
            <Input placeholder="www.fb.com" />
          </Item>

          <Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>
        </Form>
      </div>
    </div>
  );
};
