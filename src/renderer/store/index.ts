import { AddTabStore } from './add-tab';
import { TabsStore } from './tabs';
import { FaviconsStore } from './favicons';
import { SessionsStore } from './sessions';
import { PagesStore } from './pages';
import { MenuStore } from './menu';
import { SitesStore } from './sites';

export class Store {
  public addTab = new AddTabStore();
  public tabs = new TabsStore();
  public sessions = new SessionsStore();
  public pages = new PagesStore();
  public favicons = new FaviconsStore();
  public menu = new MenuStore();
  public sites = new SitesStore();
}

export default new Store();
