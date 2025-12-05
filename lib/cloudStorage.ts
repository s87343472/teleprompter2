import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'
import { encrypt, decrypt } from './encryption'

export interface CloudScript {
  id: string
  title: string
  content: string
  encryptedContent?: string
  settings?: {
    speed?: number
    fontSize?: number
    lineHeight?: number
  }
  createdAt: Date
  updatedAt: Date
}

interface FirestoreScript {
  title: string
  encryptedContent: string
  settings?: {
    speed?: number
    fontSize?: number
    lineHeight?: number
  }
  createdAt: Timestamp
  updatedAt: Timestamp
}

function getUserScriptsCollection(userId: string) {
  return collection(db, 'users', userId, 'scripts')
}

export async function saveScriptToCloud(
  userId: string,
  script: Omit<CloudScript, 'createdAt' | 'updatedAt'>,
  encryptionKey: string
): Promise<{ success: boolean; error?: Error }> {
  try {
    const encryptedContent = await encrypt(script.content, encryptionKey)
    const scriptRef = doc(getUserScriptsCollection(userId), script.id)

    await setDoc(scriptRef, {
      title: script.title,
      encryptedContent,
      settings: script.settings || {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true })

    return { success: true }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}

export async function getScriptFromCloud(
  userId: string,
  scriptId: string,
  encryptionKey: string
): Promise<{ script: CloudScript | null; error?: Error }> {
  try {
    const scriptRef = doc(getUserScriptsCollection(userId), scriptId)
    const scriptDoc = await getDoc(scriptRef)

    if (!scriptDoc.exists()) {
      return { script: null }
    }

    const data = scriptDoc.data() as FirestoreScript
    const content = await decrypt(data.encryptedContent, encryptionKey)

    return {
      script: {
        id: scriptDoc.id,
        title: data.title,
        content,
        settings: data.settings,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      }
    }
  } catch (error) {
    return { script: null, error: error as Error }
  }
}

export async function getAllScriptsFromCloud(
  userId: string,
  encryptionKey: string
): Promise<{ scripts: CloudScript[]; error?: Error }> {
  try {
    const scriptsQuery = query(
      getUserScriptsCollection(userId),
      orderBy('updatedAt', 'desc')
    )
    const snapshot = await getDocs(scriptsQuery)

    const scripts: CloudScript[] = []
    for (const doc of snapshot.docs) {
      const data = doc.data() as FirestoreScript
      try {
        const content = await decrypt(data.encryptedContent, encryptionKey)
        scripts.push({
          id: doc.id,
          title: data.title,
          content,
          settings: data.settings,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        })
      } catch {
        scripts.push({
          id: doc.id,
          title: data.title,
          content: '[Decryption failed - wrong key?]',
          settings: data.settings,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        })
      }
    }

    return { scripts }
  } catch (error) {
    return { scripts: [], error: error as Error }
  }
}

export async function deleteScriptFromCloud(
  userId: string,
  scriptId: string
): Promise<{ success: boolean; error?: Error }> {
  try {
    const scriptRef = doc(getUserScriptsCollection(userId), scriptId)
    await deleteDoc(scriptRef)
    return { success: true }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}

export async function updateScriptInCloud(
  userId: string,
  scriptId: string,
  updates: Partial<Pick<CloudScript, 'title' | 'content' | 'settings'>>,
  encryptionKey: string
): Promise<{ success: boolean; error?: Error }> {
  try {
    const scriptRef = doc(getUserScriptsCollection(userId), scriptId)
    const updateData: Record<string, unknown> = {
      updatedAt: serverTimestamp()
    }

    if (updates.title !== undefined) {
      updateData.title = updates.title
    }

    if (updates.content !== undefined) {
      updateData.encryptedContent = await encrypt(updates.content, encryptionKey)
    }

    if (updates.settings !== undefined) {
      updateData.settings = updates.settings
    }

    await setDoc(scriptRef, updateData, { merge: true })
    return { success: true }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}
