
import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { UIComponent, UserSession } from './types';

// Ваши ключи вставлены напрямую для мгновенной работы
const SUPABASE_URL = 'https://njlgikiwkwoewjvgmmcf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_LttocuA0MlAPX9RTyi6mmQ_QOS80UJf';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const CloudDB = {
  async getComponents(): Promise<UIComponent[]> {
    try {
      const { data, error } = await supabase
        .from('ui_components')
        .select('*')
        .order('dateAdded', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.warn('Using LocalStorage fallback. Did you run the SQL script in Supabase?', error);
      return this.getFallback('ui_hub_global_components');
    }
  },

  async saveComponent(component: UIComponent): Promise<void> {
    try {
      const { error } = await supabase
        .from('ui_components')
        .insert([component]);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to save to Cloud:', error);
      this.saveFallback('ui_hub_global_components', component);
    }
  },

  async deleteComponent(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('ui_components')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      this.deleteFallback('ui_hub_global_components', id);
    }
  },

  async getUsers(): Promise<UserSession[]> {
    try {
      const { data, error } = await supabase
        .from('ui_users')
        .select('*');

      if (error) throw error;
      return data || [];
    } catch (error) {
      return this.getFallback('ui_hub_global_users');
    }
  },

  async saveUser(user: UserSession): Promise<void> {
    try {
      const { error } = await supabase
        .from('ui_users')
        .upsert(user);

      if (error) throw error;
    } catch (error) {
      this.saveFallbackUser('ui_hub_global_users', user);
    }
  },

  // Fallbacks (остаются для работы если нет интернета)
  getFallback(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  saveFallback(key: string, item: any) {
    const items = this.getFallback(key);
    localStorage.setItem(key, JSON.stringify([item, ...items]));
  },

  deleteFallback(key: string, id: string) {
    const items = this.getFallback(key);
    localStorage.setItem(key, JSON.stringify(items.filter((i: any) => i.id !== id)));
  },

  saveFallbackUser(key: string, user: UserSession) {
    const users = this.getFallback(key);
    const index = users.findIndex((u: any) => u.id === user.id);
    if (index > -1) users[index] = user;
    else users.push(user);
    localStorage.setItem(key, JSON.stringify(users));
  }
};
