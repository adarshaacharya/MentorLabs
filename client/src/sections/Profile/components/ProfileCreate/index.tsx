import { Button, Form, Input, Select, Space, Typography } from 'antd';
import { countries, languages, socials } from 'data';
import { tags } from 'data/tags';
import { useAppDispatch, useAppSelector } from 'hooks';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import { createProfile } from 'store/profile/profile.action';
import { CreateProfileData } from 'types';
import { displayErrorMessage, displaySuccessNotification } from 'utils/notifications';
import * as React from 'react';

const { Item, List } = Form;
const { Title, Text } = Typography;
const { Option } = Select;

export const ProfileCreate = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.profile);

  React.useEffect(() => {
    if (status === 'rejected' && error) {
      displayErrorMessage(error);
      return;
    }
  }, [status, error]);

  const onFormSubmit = (values: CreateProfileData) => {
    dispatch(createProfile(values));
  };

  const onFinishFailed = () => {
    displayErrorMessage('Please complete all required form fields!');
    return;
  };

  return (
    <div className="profile-create">
      <div className="container">
        <Form layout="vertical" onFinish={onFormSubmit} onFinishFailed={onFinishFailed} size="large">
          <div className="profile-create__form-header">
            <Title level={3} className="profile-create__form-title">
              Hi! Let's get started filling your profile information.
            </Title>
            <Text type="secondary">
              In this form, we'll collect some basic and additional information about you. Your data is feed in our
              algorithm to recommend other users, so make sure that information entered is correct. 👇
            </Text>
          </div>

          {/* title start */}
          <Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter what defines your title!' }]}
          >
            <Input placeholder="Software Engineer" />
          </Item>
          {/* title start */}

          {/* description start */}
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
          {/* description end */}

          {/* countries start */}
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
            <Select showSearch placeholder="Select a country">
              {countries.map((country) => (
                <Option value={country.name} key={country.code}>
                  {country.name} {country.emoji}
                </Option>
              ))}
            </Select>
          </Item>
          {/* countries end */}

          {/* tags start*/}
          <Item
            label="Tags"
            name="tags"
            rules={[
              {
                required: true,
                message: 'Enter at least 3 tags that describes you!',
                type: 'array',
                min: 3,
              },
            ]}
          >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              placeholder="Start typing tags you specialize on"
            >
              {tags.map((tag) => (
                <Option key={tag} value={tag}>
                  {tag}
                </Option>
              ))}
            </Select>
          </Item>
          {/* tags end */}

          {/* languages start */}
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
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select languages you can speak"
              // defaultValue={['English']}
            >
              {languages.map((lang) => (
                <Option key={lang.code} value={lang.name}>
                  {lang.name}
                </Option>
              ))}
            </Select>
          </Item>
          {/* languages end */}

          {/* social channels */}
          <List name="channels">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline" size="small" style={{ marginRight: '4em' }}>
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
