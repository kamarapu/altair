import { SubscriptionProviderIds, WEBSOCKET_PROVIDER_ID } from './subscriptions';
import { IDictionary, TODO } from './types/shared';
import { IInitialEnvironments } from './types/state/environments.interfaces';
import { HttpVerb } from './types/state/query.interfaces';
import { SettingsState } from './types/state/settings.interfaces';
import isElectron from './utils/is_electron';

const isTranslateMode = (window as TODO).__ALTAIR_TRANSLATE__;

export interface AltairWindowOptions {
  /**
   * Initial name of the window
   */
  initialName?: string;

  /**
   * URL to set as the server endpoint
   */
  endpointURL?: string;

  /**
   * URL to set as the subscription endpoint. This can be relative or absolute.
   */
  subscriptionsEndpoint?: string;

  /**
   * URL protocol for the subscription endpoint. This is used if the specified subscriptions endpoint is relative.
   * e.g. wss
   */
  subscriptionsProtocol?: string;

  /**
   * Initial query to be added
   */
  initialQuery?: string;

  /**
   * Initial variables to be added
   */
  initialVariables?: string;

  /**
   * Initial pre-request script to be added
   */
  initialPreRequestScript?: string;

  /**
   * Initial post-request script to be added
   */
  initialPostRequestScript?: string;

  /**
   * Initial headers object to be added
   * @example
   * {
   *  'X-GraphQL-Token': 'asd7-237s-2bdk-nsdk4'
   * }
   */
  initialHeaders?: IDictionary;

  /**
   * Initial subscriptions provider
   *
   * @default "websocket"
   */
  initialSubscriptionsProvider?: SubscriptionProviderIds;

  /**
   * Initial subscriptions connection params
   */
  initialSubscriptionsPayload?: IDictionary;

  /**
   * HTTP method to use for making requests
   */
  initialHttpMethod?: HttpVerb;
}

export interface AltairConfigOptions extends AltairWindowOptions {
  /**
   * Initial Environments to be added
   * @example
   * {
   *   base: {
   *     title: 'Environment',
   *     variables: {}
   *   },
   *   subEnvironments: [
   *     {
   *       title: 'sub-1',
   *       variables: {}
   *     }
   *   ]
   * }
   */
  initialEnvironments?: IInitialEnvironments;

  /**
   * Namespace for storing the data for the altair instance.
   * Use this when you have multiple altair instances running on the same domain.
   * @example
   * instanceStorageNamespace: 'altair_dev_'
   */
  instanceStorageNamespace?: string;

  /**
   * Initial app settings to use
   */
  initialSettings?: Partial<SettingsState>;

  /**
   * Indicates if the state should be preserved for subsequent app loads
   *
   * @default true
   */
  preserveState?: boolean;

  /**
   * List of options for windows to be loaded
   */
  initialWindows?: AltairWindowOptions[];

  /**
   * Persisted settings for the app. The settings will be merged with the app settings.
   */
  persistedSettings?: Partial<SettingsState>;

  /**
   * Disable the account and remote syncing functionality
   */
  disableAccount?: boolean;
}

export class AltairConfig {
  donation = {
    url: 'https://opencollective.com/altair/donate',
    action_count_threshold: 50,
  };
  ga = 'UA-41432833-6';
  add_query_depth_limit = 3;
  tab_size = 2;
  max_windows = isElectron ? 50 : 15;
  default_language = isTranslateMode ? 'ach-UG' : 'en-US';
  languages = {
    'en-US': 'English',
    'fr-FR': 'French',
    'es-ES': 'Español',
    'cs-CZ': 'Czech',
    'de-DE': 'German',
    'pt-BR': 'Brazilian',
    'ru-RU': 'Russian',
    'uk-UA': 'Ukrainian',
    'zh-CN': 'Chinese Simplified',
    'ja-JP': 'Japanese',
    'sr-SP': 'Serbian',
    'it-IT': 'Italian',
    'pl-PL': 'Polish',
    'ko-KR': 'Korean',
    'ro-RO': 'Romanian',
    'vi-VN': 'Vietnamese',
  };
  query_history_depth = isElectron ? 100 : 15;
  disableLineNumbers = false;
  defaultTheme = 'system';
  themes = ['light', 'dark', 'dracula', 'system'];
  isTranslateMode = isTranslateMode;
  isWebApp = (window as TODO).__ALTAIR_WEB_APP__;
  initialData = {
    url: '',
    subscriptionsEndpoint: '',
    subscriptionsProtocol: '',
    query: '',
    variables: '',
    // Force type of header, since initial value inference is wrong
    headers: null as unknown as IDictionary,
    environments: {} as IInitialEnvironments,
    preRequestScript: '',
    postRequestScript: '',
    instanceStorageNamespace: 'altair_',
    settings: undefined as unknown as AltairConfigOptions['initialSettings'],
    persistedSettings:
      undefined as unknown as AltairConfigOptions['persistedSettings'],
    initialSubscriptionsProvider:
      undefined as AltairConfigOptions['initialSubscriptionsProvider'],
    initialSubscriptionsPayload: {} as IDictionary,
    initialHttpMethod: 'POST' as HttpVerb,
    preserveState: true,
    windows: [] as AltairWindowOptions[],
    disableAccount: false,
  };
  constructor({
    endpointURL,
    subscriptionsEndpoint,
    subscriptionsProtocol,
    initialQuery,
    initialHeaders,
    initialEnvironments,
    initialVariables,
    initialPreRequestScript,
    initialPostRequestScript = '',
    instanceStorageNamespace,
    initialSettings,
    persistedSettings,
    initialSubscriptionsProvider = WEBSOCKET_PROVIDER_ID,
    initialSubscriptionsPayload = {},
    initialHttpMethod = 'POST',
    preserveState = true,
    initialWindows = [],
    disableAccount = false,
  }: AltairConfigOptions = {}) {
    this.initialData.url =
      (window as TODO).__ALTAIR_ENDPOINT_URL__ ?? endpointURL ?? '';
    this.initialData.subscriptionsEndpoint =
      (window as TODO).__ALTAIR_SUBSCRIPTIONS_ENDPOINT__ ??
      subscriptionsEndpoint ??
      '';
    this.initialData.subscriptionsProtocol = subscriptionsProtocol ?? '';
    this.initialData.query =
      (window as TODO).__ALTAIR_INITIAL_QUERY__ ?? initialQuery ?? '';
    this.initialData.variables =
      (window as TODO).__ALTAIR_INITIAL_VARIABLES__ ?? initialVariables ?? '';
    this.initialData.headers =
      (window as TODO).__ALTAIR_INITIAL_HEADERS__ ?? initialHeaders ?? '';
    this.initialData.environments = initialEnvironments ?? {};
    this.initialData.preRequestScript =
      (window as TODO).__ALTAIR_INITIAL_PRE_REQUEST_SCRIPT__ ??
      initialPreRequestScript ??
      '';
    this.initialData.postRequestScript = initialPostRequestScript;
    this.initialData.instanceStorageNamespace =
      (window as TODO).__ALTAIR_INSTANCE_STORAGE_NAMESPACE__ ??
      instanceStorageNamespace ??
      'altair_';
    this.initialData.settings = initialSettings;
    this.initialData.persistedSettings = persistedSettings;
    this.initialData.initialSubscriptionsProvider = initialSubscriptionsProvider;
    this.initialData.initialSubscriptionsPayload = initialSubscriptionsPayload;
    this.initialData.initialHttpMethod = initialHttpMethod;
    this.initialData.preserveState = preserveState;
    this.initialData.windows = initialWindows;
    this.initialData.disableAccount = disableAccount;
  }
}

let config = new AltairConfig();

export const setAltairConfig = (_config: AltairConfig) => {
  config = _config;
};

export const getAltairConfig = () => {
  return config;
};
(window as TODO).getAltairConfig = getAltairConfig;
