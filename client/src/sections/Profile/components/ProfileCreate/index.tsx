import { Button, Form, Input, Select, Space, Typography } from 'antd';
import { useAppDispatch } from 'hooks';
import * as React from 'react';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import { createProfile } from 'store/profile/profile.action';
import { CreateProfileData } from 'types';
import { convertStringToArray } from 'utils/form';
import { displayErrorMessage } from 'utils/notifications';

const { Item, List } = Form;
const { Title, Text } = Typography;
const { Option } = Select;

const socials = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'Linkedin', value: 'linkedin' },
  { label: 'Slack', value: 'slack' },
];

export const ProfileCreate = () => {
  const dispatch = useAppDispatch();

  const handleCreateProfile = (formData) => {
    const languages = convertStringToArray(formData.languages);
    const tags = convertStringToArray(formData.tags);
    const values: CreateProfileData = { ...formData, languages, tags };
    dispatch(createProfile(values));
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

          {/* social channels */}
          <List name="channels">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline" size="small" style={{ marginRight: '9em' }}>
                    <Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.channel !== curValues.channel}>
                      {() => (
                        <Item
                          {...field}
                          label="Channel"
                          name={[field.name, 'site']}
                          fieldKey={[field.fieldKey, 'site']}
                          rules={[{ required: true, message: 'Select social media' }]}
                        >
                          <Select style={{ width: 130 }} placeholder="Select site">
                            {socials.map((item) => (
                              <Option key={item.label} value={item.value}>
                                {item.label}
                              </Option>
                            ))}
                          </Select>
                        </Item>
                      )}
                    </Item>
                    <Item
                      {...field}
                      label="Link"
                      name={[field.name, 'link']}
                      fieldKey={[field.fieldKey, 'link']}
                      rules={[{ required: true, message: 'Missing link' }]}
                    >
                      <Input />
                    </Item>

                    <AiOutlineMinusCircle onClick={() => remove(field.name)} color="red" />
                  </Space>
                ))}

                <Item>
                  <Button type="dashed" onClick={() => add()} block icon={<AiOutlinePlus />}>
                    Add channels
                  </Button>
                </Item>
              </>
            )}
          </List>
          {/* end of social channels */}

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
