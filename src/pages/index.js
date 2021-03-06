import React from 'react';
import { pagePropTypes } from '../propTypes';

import getApiPath from '../utils/getApiPath';
import mapStatusDataToAnalytics from '../utils/mapStatusDataToAnalytics';
import mapStatusDataToRoles from '../utils/mapStatusDataToRoles';

import withApi from '../components/_enhancers/withApi';

import BaseLayout from '../components/_layouts/Base';
import Link from '../components/Link';
import Subheader from '../components/Subheader';
import TestnetItem from '../components/TestnetItem';
import Analytics from '../components/Analytics';
import Button from '../components/Button';
import TitleWrapper from '../components/TitleWrapper';
import RoleList from '../components/RoleList';
import ColumnsLayout from '../components/ColumnsLayout';
import LayoutWrapper from '../components/LayoutWrapper';
import Hero from '../components/Hero';
import SiteMetadata from '../components/SiteMetadata';

import AcropolisImage from '../assets/svg/acropolis-main.svg';
import heroImage from '../assets/svg/hero-builder.svg';
import RomeImage from '../assets/svg/rome-main.svg';
import constantinopleImage from '../assets/svg/constantinople-main.svg';
import { ReactComponent as TickImage } from '../assets/svg/tick.svg';
import { ReactComponent as ClockImage } from '../assets/svg/clock.svg';

import { roles } from '../data/pages';
import { launchDate as romeNetworkLaunchDate } from '../data/pages/rome';
import { launchDate as constantinopleNetworkLaunchDate } from '../data/pages/constantinople';

import './style.scss';

const activeTestnet = {
  name: 'Rome',
  incentivesLink: 'https://blog.joystream.org/rome-incentives/',
};

const IndexPage = ({ content }) => (
  <BaseLayout>
    <SiteMetadata
      title="Joystream: The video platform DAO"
      description="Joystream is a video platform controlled, owned and operated by its users."
    />
    <Hero
      image={heroImage}
      title={
        <>
          The video <br /> platform DAO
        </>
      }
      animationStartValue={0}
    >
      <p className="IndexPage__hero-paragraph">
        Joystream is a video platform controlled, owned and operated by its users
      </p>
      <div className="IndexPage__hero-group">
        <Button noWrap large secondary className="IndexPage__hero-button" href={activeTestnet.incentivesLink}>
          Earn Monero
        </Button>
        <Button
          noWrap
          large
          secondary
          reversed
          className="IndexPage__hero-button"
          href="https://testnet.joystream.org/"
        >
          Launch UI
        </Button>
      </div>
    </Hero>

    <LayoutWrapper>
      <TestnetItem
        title="Rome Testnet"
        image={RomeImage}
        children={
          <>
            Rome is our fifth testnet, which introduces two new roles, {' '}
            the <Link to="/roles#content-creator">Content Creator</Link> and <Link to="/roles#content-curator">Content Curator</Link>.
          </>
        }
        button={{
          label: 'Explore Rome',
          to: '/rome',
        }}
      />
    </LayoutWrapper>

    <Analytics title="Testnet Metrics" large content={mapStatusDataToAnalytics(content)}>
      <Button secondary href={activeTestnet.incentivesLink}>
        Participate and Earn Monero
      </Button>
    </Analytics>


    <LayoutWrapper>
      <TestnetItem
        title="Constantinople Testnet"
        image={constantinopleImage}
        children="Constantinople is our sixth testnet, offering an improved proposal system."
        date={constantinopleNetworkLaunchDate}
        button={{
          label: 'Explore Constantinople',
          to: '/constantinople',
        }}
      />
    </LayoutWrapper>



    <LayoutWrapper dark>
      <TitleWrapper title="Become a user, run the platform">
        <Subheader
          title="Active roles on the current testnet"
          content="learn more, join a role and subscribe for more"
          icon={TickImage}
        />
        <ColumnsLayout>
          <RoleList roles={roles.active} content={mapStatusDataToRoles(content)} />
        </ColumnsLayout>
        <Subheader
          title="Roles coming in future testnets"
          content="choose a role, learn more and subscribe to get updated"
          icon={ClockImage}
        />
        <ColumnsLayout columnsCount={3}>
          <RoleList roles={roles.future} content={mapStatusDataToRoles(content)} />
        </ColumnsLayout>

        <Button secondary to="/roles" className="IndexPage__roles-button">
          Learn more about the roles
        </Button>
      </TitleWrapper>
    </LayoutWrapper>
  </BaseLayout>
);

IndexPage.propTypes = pagePropTypes;

export { IndexPage };
export default withApi(IndexPage, getApiPath('STATUS'));
