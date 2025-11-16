import { useState } from "react";
import { SETTINGS_PAGE, store } from "../config/store";

interface PageConfig {
  id: string;
  label: string;
  toPage: string;
}

export function usePage() {
  const pages = [
    { id: "home", label: "Home" },
    { id: "form", label: "Formulário" },
    { id: "roullete", label: "Roleta" },
    { id: "instructions", label: "Instruções" },
  ];

  const [pageConfigs, setPageConfigs] = useState<PageConfig[]>(
    pages.map((page) => ({
      id: page.id,
      label: page.label,
      toPage: "home",
    }))
  );

  const getPageLabel = (pageId: string) => {
    return pages.find((p) => p.id === pageId)?.label || pageId;
  };

  // Nova função: busca a próxima página baseada na página atual
  const getNextPage = (currentPageId: string): string => {
    const config = pageConfigs.find((c) => c.id === currentPageId);
    return config?.toPage || "home";
  };

  const loadSavedConfigs = async () => {
    try {
      const savedData = store.getTable(SETTINGS_PAGE);

      if (savedData && Object.keys(savedData).length > 0) {
        const loadedConfigs: PageConfig[] = pages.map((page) => {
          const savedConfig = savedData[page.id];
          return {
            id: page.id,
            label: page.label,
            toPage: String(savedConfig?.toPage || "home"),
          };
        });

        setPageConfigs(loadedConfigs);
        console.log(pageConfigs);
      }
    } catch (error) {
      console.error("Erro ao carregar configurações:", error);
    }
  };

  return {
    pageConfigs,
    getPageLabel,
    getNextPage,
    loadSavedConfigs,
  };
}
