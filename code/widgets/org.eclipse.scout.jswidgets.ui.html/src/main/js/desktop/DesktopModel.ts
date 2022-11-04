import {icons, WidgetsOutline} from '../index';
import {Desktop, DesktopModel, icons as icons_1, Menu} from '@eclipse-scout/core';

export default (): DesktopModel => ({
  id: 'jswidgets.Desktop',
  title: '${textKey:Widgets}',
  objectType: Desktop,
  logoUrl: 'img/eclipse_scout_logo.svg',
  logoActionEnabled: true,
  nativeNotificationDefaults: {
    iconId: 'img/eclipse_scout_logo.png'
  },
  outline: {
    objectType: WidgetsOutline
  },
  menus: [
    {
      id: 'SettingsMenu',
      objectType: Menu,
      iconId: icons.PAINT_BRUSH,
      text: '${textKey:Settings}',
      childActions: [
        {
          id: 'ThemeMenu',
          objectType: Menu,
          text: '${textKey:Theme}',
          iconId: icons_1.CHECKED_BOLD, /* used as placeholder */
          cssClass: 'theme-menu',
          childActions: [
            {
              id: 'DefaultThemeMenu',
              objectType: Menu,
              text: 'Default'
            },
            {
              id: 'DarkThemeMenu',
              objectType: Menu,
              text: 'Dark'
            }
          ]
        },
        {
          id: 'DenseMenu',
          objectType: Menu,
          text: 'Dense'
        }
      ]
    }
  ]
});

export type DesktopWidgetMap = {
  'SettingsMenu': Menu;
  'ThemeMenu': Menu;
  'DefaultThemeMenu': Menu;
  'DarkThemeMenu': Menu;
  'DenseMenu': Menu;
};
