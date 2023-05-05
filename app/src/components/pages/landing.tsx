import styled from '@emotion/styled';
import {Button} from '@mantine/core';
import {useCallback} from 'react';
import {FormattedMessage} from 'react-intl';
import {useAppDispatch} from '../../store';
import {openOpenAIApiKeyPanel} from '../../store/settings-ui';
import {Page} from '../page';
import {useOption} from '../../core/options/use-option';
import {isProxySupported} from '../../core/chat/openai';

const Container = styled.div`
  flex-grow: 1;
  padding-bottom: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Work Sans', sans-serif;
  line-height: 1.7;
  gap: 1rem;
`;

export default function LandingPage(props: any) {
  const [openAIApiKey] = useOption<string>('openai', 'apiKey');
  const dispatch = useAppDispatch();
  const onConnectButtonClick = useCallback(
    () => dispatch(openOpenAIApiKeyPanel()),
    [dispatch],
  );

  return (
    <Page id={'landing'} showSubHeader={true}>
      <Container>
        <p>
          <FormattedMessage
            defaultMessage={'Hello, what would you like to work on?'}
            description="A friendly message that appears at the start of new chat sessions"
          />
        </p>
        <Button
          size="md"
          variant="light"
          compact
          radius={'md'}
          onClick={onConnectButtonClick} // Replace this with set system prompt function
        >
          <FormattedMessage defaultMessage={'Morning Routine'} />
        </Button>
        <Button
          size="md"
          variant="light"
          compact
          radius={'md'}
          onClick={onConnectButtonClick} // Replace this with set system prompt function
        >
          <FormattedMessage defaultMessage={'Night Routine'} />
        </Button>
        <Button
          size="md"
          variant="light"
          radius={'md'}
          compact
          onClick={onConnectButtonClick} // Replace this with set system prompt function
        >
          <FormattedMessage defaultMessage={'Weekly Routine'} />
        </Button>
        {!openAIApiKey && !isProxySupported() && (
          <Button
            size="xs"
            variant="light"
            compact
            onClick={onConnectButtonClick}
          >
            <FormattedMessage
              defaultMessage={'Connect your OpenAI account to get started'}
            />
          </Button>
        )}
      </Container>
    </Page>
  );
}
