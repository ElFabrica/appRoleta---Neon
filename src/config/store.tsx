import { createStore, Store } from "tinybase";
import {
  createExpoSqlitePersister,
  ExpoSqlitePersister,
} from "tinybase/persisters/persister-expo-sqlite";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("database.db");

const store: Store = createStore();

const USERS_TABLE = "usersRoleta";
const PRIZES_TABLE = "prizes";
const SETTINGS_PAGE = "@settings-roullete-app-act";

const persister: ExpoSqlitePersister = createExpoSqlitePersister(store, db);

let isStoreInitialized = false;

const initializeStore = async () => {
  if (isStoreInitialized) {
    console.log("Store já inicializada.");
    return;
  }

  try {
    await persister.load();

    if (!store.hasTable(USERS_TABLE)) {
      store.setTable(USERS_TABLE, {});
    }
    if (!store.hasTable(PRIZES_TABLE)) {
      store.setTable(PRIZES_TABLE, {});
    }
    if (!store.hasTable(SETTINGS_PAGE)) {
      store.setTable(SETTINGS_PAGE, {});
    }

    await persister.startAutoSave();
    isStoreInitialized = true;
  } catch (error) {
    console.error("Erro Crítico ao inicializar a store:", error);
    throw error;
  }
};

const clearTable = async (tableName: string) => {
  if (!isStoreInitialized) {
    console.warn(
      "Tentando limpar tabela antes da store ser inicializada. Carregando store primeiro..."
    );
    await initializeStore();
  }
  store.delTable(tableName);
  console.log(`Tabela ${tableName} limpa. Autosave deve persistir.`);
};
const updateRow = (tableName: string, rowId: string, newData: any) => {
  const currentRow = store.getRow(tableName, rowId);
  if (!currentRow) {
    console.warn(`Linha com ID ${rowId} não encontrada na tabela ${tableName}`);
    return;
  }
  store.setRow(tableName, rowId, { ...currentRow, ...newData });
};

export {
  store,
  USERS_TABLE,
  PRIZES_TABLE,
  SETTINGS_PAGE,
  initializeStore,
  persister, // Exporte se precisar acessar diretamente, mas geralmente não é necessário fora daqui
  clearTable,
  isStoreInitialized, // Pode ser útil para verificar em outros lugares
  updateRow,
};
