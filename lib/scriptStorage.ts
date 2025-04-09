import { v4 as uuidv4 } from 'uuid';

// localStorage键名
const SCRIPTS_KEY = 'teleprompter_scripts';
const CURRENT_SCRIPT_KEY = 'teleprompter_current_script';

// 脚本对象类型
export interface StoredScript {
  id: string;
  content: string;
  title?: string;
  createdAt: number;
  updatedAt: number;
  settings?: {
    speed?: number;
    fontSize?: number;
    lineHeight?: number;
  };
}

// 获取所有保存的脚本
export function getAllScripts(): StoredScript[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const scripts = localStorage.getItem(SCRIPTS_KEY);
    return scripts ? JSON.parse(scripts) : [];
  } catch (error) {
    console.error('Failed to get scripts from localStorage:', error);
    return [];
  }
}

// 获取单个脚本
export function getScript(id: string): StoredScript | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const scripts = getAllScripts();
    return scripts.find(script => script.id === id) || null;
  } catch (error) {
    console.error(`Failed to get script ${id}:`, error);
    return null;
  }
}

// 保存脚本
export function saveScript(content: string, title: string = '', id?: string, settings?: StoredScript['settings']): string {
  if (typeof window === 'undefined') return '';
  
  try {
    const scripts = getAllScripts();
    const now = Date.now();
    let scriptId = id || '';
    
    // 如果提供了ID，检查是否已存在
    if (id) {
      const existingIndex = scripts.findIndex(script => script.id === id);
      if (existingIndex >= 0) {
        // 更新现有脚本
        scripts[existingIndex] = {
          ...scripts[existingIndex],
          content,
          title: title || scripts[existingIndex].title || '',
          updatedAt: now,
          settings: settings || scripts[existingIndex].settings
        };
      } else {
        // ID不存在，创建新脚本
        const newScript: StoredScript = {
          id,
          content,
          title,
          createdAt: now,
          updatedAt: now,
          settings
        };
        scripts.push(newScript);
      }
    } else {
      // 生成新ID并创建新脚本
      scriptId = uuidv4();
      const newScript: StoredScript = {
        id: scriptId,
        content,
        title,
        createdAt: now,
        updatedAt: now,
        settings
      };
      scripts.push(newScript);
    }
    
    // 保存到localStorage
    localStorage.setItem(SCRIPTS_KEY, JSON.stringify(scripts));
    
    // 设置为当前脚本
    setCurrentScript(scriptId);
    
    return scriptId;
  } catch (error) {
    console.error('Failed to save script:', error);
    return '';
  }
}

// 删除脚本
export function deleteScript(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    let scripts = getAllScripts();
    scripts = scripts.filter(script => script.id !== id);
    localStorage.setItem(SCRIPTS_KEY, JSON.stringify(scripts));
    
    // 如果删除的是当前脚本，清除当前脚本
    if (getCurrentScript() === id) {
      clearCurrentScript();
    }
    
    return true;
  } catch (error) {
    console.error(`Failed to delete script ${id}:`, error);
    return false;
  }
}

// 设置当前脚本ID
export function setCurrentScript(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CURRENT_SCRIPT_KEY, id);
}

// 获取当前脚本ID
export function getCurrentScript(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(CURRENT_SCRIPT_KEY);
}

// 清除当前脚本ID
export function clearCurrentScript(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CURRENT_SCRIPT_KEY);
}

// 获取默认脚本内容（当没有脚本时使用）
export function getDefaultScriptContent(): string {
  return "Welcome to Teleprompter.today professional system.\n\nThis is your script content, each line will be clearly displayed during playback.\n\nThe system automatically tracks the current reading line and provides highlighting.\n\nYou can easily adjust scrolling speed, font size, and display effects.\n\nStart using it now to create a more professional presentation experience!";
} 