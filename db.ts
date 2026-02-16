
import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { UIComponent, UserSession } from './types.ts';

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
      console.error('Supabase fetch error:', error);
      return []; // Return empty instead of breaking
    }
  },

  async saveComponent(component: UIComponent): Promise<void> {
    try {
      const { error } = await supabase
        .from('ui_components')
        .insert([component]);

      if (error) throw error;
    } catch (error) {
      console.error('Supabase save error:', error);
      throw error;
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
      console.error('Supabase delete error:', error);
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
      console.error('Supabase users error:', error);
      return [];
    }
  },

  async saveUser(user: UserSession): Promise<void> {
    try {
      const { error } = await supabase
        .from('ui_users')
        .upsert(user);

      if (error) throw error;
    } catch (error) {
      console.error('Supabase user save error:', error);
    }
  }
};
