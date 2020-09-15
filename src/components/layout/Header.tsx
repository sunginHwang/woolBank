import React from 'react';
import { Helmet } from 'react-helmet';

export interface HeaderProps {
  title: string;
  description: string;
}
function Header({ title, description }: HeaderProps) {
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>{title}</title>
      <meta name='viewport' content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no' />
      <meta name='theme-color' content='#ffffff' />
      <meta name='keywords' content='자산, 버킷리스트, 토이프로젝트' />
      <meta property='og:site_name' content='BanketList' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta name='description' content={description} />
      <link rel='shortcut icon' href='null' type='image/x-icon' />
      <link rel='icon' href='../static/favicon/ico-64x64.ico' sizes='64x64' />
      <link rel='apple-touch-icon' href='../static/favicon/ico-64x64.ico' sizes='64x64' />
    </Helmet>
  );
}

export default Header;
