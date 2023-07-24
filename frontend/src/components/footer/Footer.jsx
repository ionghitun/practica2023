import React from 'react';
import { Group, Title, Paper, Text, Container } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';

const footerLinks = [
  ['Ajutor si contact', 'Citeste blog-ul', 'Conditii de utilizare', 'Politica de confidentialitate'],
  ['Cariere', 'Setari Cookies', 'Politica privind cookie-urile', 'Preturi de publicitate'],
];

function Footer() {
  return (
    <div style={{ backgroundColor: '#f0f2f5', padding: '40px 0' }}>
      <Container size="sm">
        <Group align="center" justify="center" spacing="lg">
          <Title>@Copyright 2023</Title>
          <Group direction="column" align="start" spacing="xs">
            <Text style={{ fontWeight: 500 }}>Contact Us</Text>
            <Text>Email: contact@example.com</Text>
            <Text>Phone: +1 234 567 890</Text>
          </Group>
          <Group spacing="md" position="right">
            <IconBrandTwitter size="1.3rem" stroke={1.5} />
            <IconBrandYoutube size="1.3rem" stroke={1.5} />
            <IconBrandInstagram size="1.3rem" stroke={1.5} />
          </Group>
        </Group>
        <div style={{ borderTop: '1px solid #d2d8e2', margin: '20px 0' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {footerLinks.map((columnLinks, index) => (
            <div key={index}>
              {columnLinks.map((link, linkIndex) => (
                <Text key={linkIndex}>{link}</Text>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Footer;