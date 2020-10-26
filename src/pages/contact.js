/** @jsx jsx */
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { jsx } from 'theme-ui';

import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Textarea from '../components/Textarea';

const Contact = ({ data }) => {
  const { 
    contact: { 
      title,
      nameLabel,
      eMailLabel,
      subjectLabel,
      messageLabel,
      submitLabel,
      nameErrorMsg,
      eMailErrorMsg,
      subjectErrorMsg,
      messageErrorMsg,
      nameRegexp,
      eMailRegexp,
      subjectRegexp,
      messageRegexp
    }
  } = data;

  const regexp = useMemo(() => ({
    email: new RegExp(eMailRegexp),
    message: new RegExp(messageRegexp),
    name: new RegExp(nameRegexp),
    subject: new RegExp(subjectRegexp),
  }), [nameRegexp, eMailRegexp, subjectRegexp, messageRegexp]);

  const [form, setForm] = useState({
    email: { valid: false, length: 0 },
    message: { valid: false, length: 0 },
    subject: { valid: false, length: 0 },
    name: { valid: false, length: 0 }
  });

  function validateField(e) {
    const field = e.currentTarget;
    setForm(state => ({
      ...state,
      [field.name]: {
        valid: field.value.match(regexp[field.name]) ? true : false,
        length: field.value.length
      }
    }));
  }

  return (
    <Layout heading={title}>
      <Section>
        <form
          action="/contact/send"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          method="POST"
          name="contact"
          sx={{
            paddingX: [0, 5, 8],
            display: 'grid',
            gap: 5,
            gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'], 
            fontSize: 3,
            fontFamily: 'body',
          }}
        >
          <FontAwesomeIcon 
            icon={faEnvelopeOpenText}
            sx={{ 
              color: 'primaryTrans',
              filter: ({ shadows }) => `drop-shadow(${shadows[1]})`,
              fontSize: 7,
              alignSelf: 'center',
              justifySelf: 'center',
              marginRight: [0, 5, 8],
            }}
          />

          <div sx={{ display: 'grid', gap: 3 }}>
            <input name="bot-field" type="hidden" />
            <input name="form-name" type="hidden" value="contact" />
            <label>
              <span>{nameLabel}:</span>
              <Input
                name="name"
                onBlur={validateField}
                onKeyUp={validateField}
                type="text" 
              />
            </label>
            {!form.name.valid && form.name.length > 0 && 
              <span sx={{ color: 'error' }}>
                {nameErrorMsg}
              </span>}
            <label>
              <span>{eMailLabel}:</span>
              <Input
                name="email"
                onBlur={validateField}
                onKeyUp={validateField}
                type="email" 
              />
            </label>
            {!form.email.valid && form.email.length > 0 && 
              <span sx={{ color: 'error' }}>
                {eMailErrorMsg}
              </span>}
            <label>
              <span>{subjectLabel}:</span>
              <Input
                name="subject"
                onBlur={validateField}
                onKeyUp={validateField}
                type="subject" 
              />
            </label>
            {!form.subject.valid && form.subject.length > 0 && 
              <span sx={{ color: 'error' }}>
                {subjectErrorMsg}
              </span>}
            <label>
              <span>{messageLabel}:</span>
              <Textarea name="message" onBlur={validateField} onKeyUp={validateField} />
            </label>
            {!form.message.valid && form.message.length > 0 && 
              <span sx={{ color: 'error' }}>
                {messageErrorMsg}
              </span>}
            <Button
              disabled={!(form.email.valid && form.message.valid && form.name.valid && form.subject.valid)}
              type="submit"
            >
              {submitLabel}
            </Button>
          </div>
        </form>
      </Section>
    </Layout>
  );
};

export default Contact;

Contact.propTypes = { 
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query {
    contact: pagesYaml(fields: { type: {eq: "contact"} }) {
      title
      nameLabel
      eMailLabel
      subjectLabel
      messageLabel
      submitLabel
      nameErrorMsg
      eMailErrorMsg
      subjectErrorMsg
      messageErrorMsg
      nameRegexp
      eMailRegexp
      subjectRegexp
      messageRegexp
    }
  }
`;