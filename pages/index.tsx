import React from 'react';

import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import Image from 'next/image';

import { Box, SxProps, Typography } from '@mui/material';
import { COLORS, MQ } from 'src/theme';

import PageProvider from 'src/components/PageProvider';
import Section from 'src/components/Section';
import CrossplaneLogosSection from 'src/components/CrossplaneLogosSection';
import V2Banner from 'src/components/V2Banner';
import Button from 'src/elements/Button';
import Link from 'src/elements/Link';
import iceCreamIcon from 'public/icecream-icon.svg';
import createdBy from 'public/created-by-upbound.svg';
import gradientGraphic from 'public/background-graphics/gradient-graphic.png';
import gradientGraphicSM from 'public/background-graphics/gradient-graphic-sm.png';
import truckAnim from 'public/animations/truck.json';
import controlPlanes from 'public/animations/control_planes.json';
import codingAnim from 'public/animations/coding.json';
import { indexData } from 'src/static-cms';

const cmsData = indexData;

const headerSection: SxProps = {
  pt: { _: 13, md: 23.5 },
  pb: 4,
  textAlign: 'center',
};

const headerButtons: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: { _: 'column', sm: 'row' },

  '& > button, a': {
    mx: { _: 0, sm: '10px' },
    minWidth: '100%',

    [MQ.sm]: {
      minWidth: 256,
    },

    ':not(:last-of-type)': {
      mb: { _: 5, sm: 0 },
    },
  },
};

const HeaderSection = (props: HomePageHeader) => {
  return (
    <>
      <Box sx={{ position: 'relative', mb: 5 }}>
        <Box>
          <Typography variant="h1" color="#fff">
            {props.title}{' '}
            <Box
              component="span"
              sx={{
                '> img': {
                  width: '16.6px',
                  height: '35px',
                  '@media screen and (min-width: 768px)': {
                    width: '35.58px',
                    height: '75px',
                  },
                },
              }}
            >
              <Image src={iceCreamIcon} alt="icon" />
            </Box>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ maxWidth: 950, mx: 'auto', textAlign: 'left' }}>
        <Typography variant="body_normal" color="#fff" sx={{ mb: 1.5 }}>
          Create platforms like cloud providers:
        </Typography>
        <Box
          component="ul"
          sx={{
            pl: { _: 5, md: 8 },
            m: 0,
            '& li': {
              color: '#fff',
              mb: 1,
              '&::marker': {
                fontSize: '1.2em',
              },
            },
          }}
        >
          <Box component="li">
            <Typography variant="body_normal" color="#fff">
              Build your own APIs and services with control planes
            </Typography>
          </Box>
          <Box component="li">
            <Typography variant="body_normal" color="#fff">
              Extend Kubernetes to manage any resource anywhere
            </Typography>
          </Box>
          <Box component="li">
            <Typography variant="body_normal" color="#fff">
              Use a library of components to assemble your platform faster
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 6, mb: { _: 6, sm: 10 } }}>
        <Box sx={headerButtons}>
          {props.buttons.map(({ id, value }) => (
            <Button key={id} sizeType="normal" cmsValue={value}>
              {value.text}
            </Button>
          ))}
        </Box>
        <V2Banner />
      </Box>
    </>
  );
};

const FeatureBlock = ({ feature, index }: { feature: HomePageFeature; index: number }) => {
  const reversed = index % 2 !== 0;
  // const colorOptions = [COLORS.froly, COLORS.brightSun, COLORS.turquoise];
  const animOptions = [truckAnim, controlPlanes, codingAnim];

  const { title, text, link_text, link } = feature;

  return (
    <Box
      sx={{
        width: '100%',

        display: 'flex',
        color: COLORS.linkWater,
        position: 'relative',
        flexDirection: 'column',
        [MQ.lg]: {
          alignItems: 'center',
          flexDirection: reversed ? 'row-reverse' : 'row',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          [MQ.lg]: {
            flex: 1,
            width: '50%',
            minWidth: '50%',
            maxWidth: '50%',
            pr: reversed ? '0px' : '28px',
            pl: reversed ? '28px' : '0px',
          },
        }}
      >
        <Typography variant="h2" sx={{ maxWidth: 450, mb: 2.5 }}>
          {title}
        </Typography>
        <Typography variant="body_normal" sx={{ maxWidth: 496 }}>
          {text}
        </Typography>
        <Link
          href={link[0].value}
          muiProps={{
            target: link[0].type === 'external_url' ? '_blank' : undefined,
            color: COLORS.turquoise,
            // color: colorOptions[index % 3],
            sx: { mt: 5 },
          }}
          hasArrow
        >
          {link_text}
        </Link>
      </Box>
      <Box
        sx={{
          mt: '40px',
          [MQ.lg]: {
            flex: 1,
            mt: 0,
            width: '50%',
            minWidth: '50%',
            maxWidth: '50%',
            pr: reversed ? '28px' : '0px',
            pl: reversed ? '0px' : '28px',
          },
        }}
      >
        <Box>
          <Lottie animationData={animOptions[index % 3]} loop={true} />
        </Box>
      </Box>
    </Box>
  );
};

const FeaturesSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > div:not(:last-of-type)': { mb: { _: 10, lg: 23.5 } },
      }}
    >
      {cmsData.features_sections.map(({ id, value }, index) => (
        <FeatureBlock key={id} feature={value} index={index} />
      ))}
    </Box>
  );
};

const Home = () => {
  return (
    <PageProvider
      cms_head_props={cmsData.cms_head_props}
      ctaTitle={cmsData.cta_section_title}
      ctaParagraph={cmsData.cta_section_text}
      ctaBtnText={
        cmsData.cta_section_buttons &&
        cmsData.cta_section_buttons[0] &&
        cmsData.cta_section_buttons[0].value?.text
      }
      ctaBtnLink={
        cmsData.cta_section_buttons &&
        cmsData.cta_section_buttons[0] &&
        cmsData.cta_section_buttons[0].value?.link
          ? cmsData.cta_section_buttons[0].value.link[0].value
          : undefined
      }
      ctaBtnStyleType={
        cmsData.cta_section_buttons &&
        cmsData.cta_section_buttons[0] &&
        cmsData.cta_section_buttons[0].value?.style_type
      }
      ctaBtnTarget={
        cmsData.cta_section_buttons &&
        cmsData.cta_section_buttons[0] &&
        cmsData.cta_section_buttons[0].value?.link &&
        cmsData.cta_section_buttons[0].value.link[0].type === 'external_url'
          ? '_blank'
          : '_self'
      }
      ctaBtnTwoText={
        cmsData.cta_section_buttons &&
        cmsData.cta_section_buttons[1] &&
        cmsData.cta_section_buttons[1].value?.text
      }
      ctaBtnTwoLink={
        cmsData.cta_section_buttons &&
        cmsData.cta_section_buttons[1] &&
        cmsData.cta_section_buttons[1].value?.link
          ? cmsData.cta_section_buttons[1].value.link[0].value
          : undefined
      }
      ctaBtnTwoTarget={
        cmsData.cta_section_buttons &&
        cmsData.cta_section_buttons[1] &&
        cmsData.cta_section_buttons[1].value?.link &&
        cmsData.cta_section_buttons[1].value.link[0].type === 'external_url'
          ? '_blank'
          : '_self'
      }
      ctaBtnTwoStyleType={
        cmsData.cta_section_buttons &&
        cmsData.cta_section_buttons[1] &&
        cmsData.cta_section_buttons[1].value?.style_type
      }
    >
      <Section sx={headerSection}>
        <HeaderSection {...cmsData.header[0].value} />
      </Section>

      <Section
        angleTop="topRight"
        sx={{
          pt: { _: 16, md: 23.5 },
          backgroundColor: '#fff',
        }}
      >
        <Box sx={{ maxWidth: 950, mx: 'auto', pb: { _: 13, md: 16 }, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2.5 }}>
            {cmsData.section_1_title}
          </Typography>
          <Typography variant="body_normal">{cmsData.section_1_sub_title}</Typography>
          <Box sx={{ maxWidth: 269, mx: 'auto', my: 3 }}>
            <Image
              src={createdBy}
              alt="createdBy"
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
          {cmsData.section_1_button[0] && (
            <Button
              cmsValue={cmsData.section_1_button[0].value}
              styleType={cmsData.section_1_button[0].value?.style_type}
            >
              {cmsData.section_1_button[0].value.text}
            </Button>
          )}
        </Box>

        <CrossplaneLogosSection {...cmsData} />

        <Box sx={{ py: { _: 10, md: 16 } }}>
          <Image
            src={gradientGraphic}
            alt="gradient graphic"
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>

        <Box
          sx={{
            pb: { _: 16, md: 23.5 },
            position: 'relative',
          }}
        >
          <FeaturesSection />
        </Box>

        <Box sx={{ maxWidth: 476, mx: 'auto', pt: 16 }}>
          <Image
            src={gradientGraphicSM}
            alt="gradient graphic"
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      </Section>
    </PageProvider>
  );
};

export default Home;
