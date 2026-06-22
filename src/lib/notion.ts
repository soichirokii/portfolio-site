import type { Work } from "./types";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DB_ID = process.env.NOTION_DB_ID ?? "9934fdf8-22cf-481f-9528-a65eeac4be52";
const NOTION_VERSION = "2022-06-28";

function notionHeaders() {
  return {
    Authorization: `Bearer ${NOTION_TOKEN}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

function richText(arr: Array<{ plain_text: string }> | undefined): string {
  if (!arr || arr.length === 0) return "";
  return arr.map((t) => t.plain_text).join("").replace(/<br>/g, "\n");
}

function fileUrl(arr: Array<{ type: string; file?: { url: string }; external?: { url: string } }> | undefined): string | null {
  if (!arr || arr.length === 0) return null;
  const f = arr[0];
  return f.type === "file" ? f.file?.url ?? null : f.external?.url ?? null;
}

function fileUrls(arr: Array<{ type: string; file?: { url: string }; external?: { url: string } }> | undefined): string[] {
  if (!arr || arr.length === 0) return [];
  return arr.flatMap((f) => {
    const url = f.type === "file" ? f.file?.url : f.external?.url;
    return url ? [url] : [];
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pageToWork(page: any): Work {
  const p = page.properties;
  return {
    id: page.id,
    title: richText(p.Title?.title) || p.Title?.title?.[0]?.plain_text || "",
    slug: richText(p.Slug?.rich_text),
    type: p.Type?.select?.name ?? "Work",
    category: p.Category?.multi_select?.map((s: { name: string }) => s.name) ?? [],
    period: richText(p.Period?.rich_text),
    role: richText(p.Role?.rich_text),
    target: richText(p.Target?.rich_text),
    overview: richText(p.Overview?.rich_text),
    designProcess: richText(p.DesignProcess?.rich_text),
    learnings: richText(p.Learnings?.rich_text),
    results: richText(p.Results?.rich_text),
    problem: richText(p.Problem?.rich_text),
    mainImage: p.MainImage?.url ?? null,
    processImages: richText(p.ProcessImages?.rich_text)
      .split(/[\n,]/)
      .map((s: string) => s.trim())
      .filter(Boolean),
    order: p.Order?.number ?? 99,
    status: p.Status?.select?.name ?? "",
  };
}

export async function fetchAllWorks(): Promise<Work[]> {
  if (!NOTION_TOKEN) return STATIC_WORKS;

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`, {
      method: "POST",
      headers: notionHeaders(),
      body: JSON.stringify({
        sorts: [{ property: "Order", direction: "ascending" }],
        filter: { property: "Status", select: { equals: "公開中" } },
      }),
      next: { revalidate: 60 },
    });
    if (!res.ok) return STATIC_WORKS;
    const data = await res.json();
    return data.results.map(pageToWork);
  } catch {
    return STATIC_WORKS;
  }
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  if (!NOTION_TOKEN) return STATIC_WORKS.find((w) => w.slug === slug) ?? null;

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`, {
      method: "POST",
      headers: notionHeaders(),
      body: JSON.stringify({
        filter: { property: "Slug", rich_text: { equals: slug } },
      }),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.results.length === 0) return null;
    return pageToWork(data.results[0]);
  } catch {
    return null;
  }
}

// Static fallback data (used when NOTION_TOKEN is not set)
export const STATIC_WORKS: Work[] = [
  {
    id: "1",
    title: "まるごと祭2025",
    slug: "marugoto-matsuri-2025",
    type: "Project",
    category: ["PM", "Content"],
    period: "2024.09 〜 2025.05",
    role: "プロジェクトマネージャー",
    target: "",
    overview: "",
    designProcess: "",
    learnings: "",
    results: "",
    problem: "",
    mainImage: null,
    processImages: [],
    order: 1,
    status: "公開中",
  },
  {
    id: "2",
    title: "BEElog",
    slug: "beelog",
    type: "Project",
    category: ["Branding", "UI/UX", "Development", "Media"],
    period: "2025.06 〜 現在",
    role: "ブランディング / UI/UX / 開発 / SNS",
    target: "",
    overview: "",
    designProcess: "",
    learnings: "",
    results: "",
    problem: "",
    mainImage: null,
    processImages: [],
    order: 2,
    status: "公開中",
  },
  {
    id: "3",
    title: "Hanabi",
    slug: "hanabi",
    type: "Project",
    category: ["Sales", "Finance"],
    period: "2025.06 〜 現在",
    role: "Sales / Finance",
    target: "",
    overview: "",
    designProcess: "",
    learnings: "",
    results: "",
    problem: "",
    mainImage: null,
    processImages: [],
    order: 3,
    status: "公開中",
  },
  {
    id: "4",
    title: "林商店 ブランドデザイン",
    slug: "hayashi-brand",
    type: "Work",
    category: ["Branding", "Original"],
    period: "2025.05",
    role: "ブランドデザイン",
    target: "",
    overview: "",
    designProcess: "",
    learnings: "",
    results: "",
    problem: "",
    mainImage: null,
    processImages: [],
    order: 4,
    status: "公開中",
  },
  {
    id: "5",
    title: "Hanabi ステッカーデザイン",
    slug: "hanabi-sticker",
    type: "Work",
    category: ["Goods", "Branding"],
    period: "2025.06",
    role: "グラフィックデザイン",
    target: "",
    overview: "",
    designProcess: "",
    learnings: "",
    results: "",
    problem: "",
    mainImage: null,
    processImages: [],
    order: 5,
    status: "公開中",
  },
  {
    id: "6",
    title: "KEETO ポスター",
    slug: "keeto-poster",
    type: "Work",
    category: ["Original"],
    period: "2025.05",
    role: "グラフィックデザイン",
    target: "",
    overview: "",
    designProcess: "",
    learnings: "",
    results: "",
    problem: "",
    mainImage: null,
    processImages: [],
    order: 6,
    status: "公開中",
  },
  {
    id: "7",
    title: "BEElog ロゴデザイン",
    slug: "beelog-logo",
    type: "Work",
    category: ["Branding", "Graphic"],
    period: "2025.06",
    role: "ロゴデザイン",
    target: "",
    overview: "BEElogのロゴをデザイン。名前の由来にもなった「蜂」をモチーフに、シンプルさと視認性を意識して制作。\n\n「BEE log」という名前には、ミツバチが花から花へと蜜と花粉を運び、生態系を豊かにするように、「10代が情報を糊にして新しい価値を咲かせてほしい」という願いを込めた。初めてのロゴ制作で、視認性とデザイン性、意味との両立が難しかった。",
    designProcess: "",
    learnings: "",
    results: "",
    problem: "",
    mainImage: null,
    processImages: [],
    order: 7,
    status: "公開中",
  },
  {
    id: "8",
    title: "BEElog サイトデザイン",
    slug: "beelog-website",
    type: "Work",
    category: ["UI/UX", "Development"],
    period: "2025.06 〜 現在",
    role: "UI/UXデザイン / 開発",
    target: "",
    overview: "BEElogのサイトを設計・制作。インスタの次は、本命のWebサイトを立ち上げた。初めてのUI/UX・開発で、何もわからない状態から公開まで漕ぎ着けた。\n\nメディアとしての役割を果たせるよう、見やすさと情報量のバランスを保てるよう設計した。プログラミング未経験の人でも記事を更新しやすい仕様にした。他のメディアを参考にしながら、身の回りの人にも助言を求めて進めた。情報を見て終わらせず、応募など次のアクションにつながる設計を意識した。",
    designProcess: "",
    learnings: "",
    results: "",
    problem: "",
    mainImage: null,
    processImages: [],
    order: 8,
    status: "公開中",
  },
  {
    id: "9",
    title: "BEElog SNSオペレーション",
    slug: "beelog-sns",
    type: "Work",
    category: ["Media", "Content"],
    period: "2025.06 〜 現在",
    role: "SNSオペレーション",
    target: "",
    overview: "BEElogのInstagram運用を担当。投稿テンプレートは現在まで2バージョンを作成。わかりやすさと情報量のバランスを保つことを意識した。進路選択の時期には進路情報の企画を実施。\n\n最高月間PV8万、フォロワー430人（2026年6月現在）。投稿頻度の保ち方が次の課題。",
    designProcess: "",
    learnings: "",
    results: "",
    problem: "",
    mainImage: null,
    processImages: [],
    order: 9,
    status: "公開中",
  },
  {
    id: "10",
    title: "まるごと祭2025 タベストリーデザイン",
    slug: "marugoto-tapestry",
    type: "Work",
    category: ["Graphic", "Branding"],
    period: "2025.04",
    role: "グラフィックデザイン",
    target: "",
    overview: "",
    designProcess: "",
    learnings: "",
    results: "",
    problem: "",
    mainImage: null,
    processImages: [],
    order: 10,
    status: "公開中",
  },
];
