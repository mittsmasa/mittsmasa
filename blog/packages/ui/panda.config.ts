import { defineConfig } from "@pandacss/dev";

// css() に書けるのは、ここで定義した semantic token と text style だけ。
// 値は Design キャンバス「ブログ モバイルモック」に出てくるものだけを置く。
// 生の値に名前を付ける層（gray.900 など）は作らない。strictTokens はその層の名前も通すため
export default defineConfig({
  presets: ["@pandacss/preset-base"],
  preflight: false,
  include: ["./src/**/*.{ts,tsx}"],
  exclude: ["./src/**/*.test.{ts,tsx}"],
  jsxFramework: "react",
  outdir: "styled-system",
  // token のある分類では、token 以外の値を型エラーにする
  strictTokens: true,
  utilities: {
    extend: {
      // 文字の大きさ、行送り、字間は textStyle でだけ決める。
      // strictTokens は token の無い分類を縛らないので、書ける値を inherit だけにする
      fontSize: { values: { inherit: "inherit" } },
      lineHeight: { values: { inherit: "inherit" } },
      letterSpacing: { values: { inherit: "inherit" } },
    },
  },
  theme: {
    // モバイルと PC を切り替える幅。デザインに指定が無く、ユーザーと決めた値
    breakpoints: { md: "768px" },
    semanticTokens: {
      colors: {
        bg: {
          default: { value: "#ffffff" },
          code: { value: "#f6f6f5" },
        },
        fg: {
          default: { value: "#222222" },
          sub: { value: "#444444" },
          muted: { value: "#6b6b6b" },
        },
        border: {
          default: { value: "#e5e5e5" },
          strong: { value: "#222222" },
        },
      },
      fonts: {
        body: { value: "'Zen Kaku Gothic New', sans-serif" },
        mono: { value: "'IBM Plex Mono', ui-monospace, monospace" },
      },
      fontWeights: {
        // 本文の中の強調
        emphasis: { value: "500" },
      },
      borders: {
        none: { value: "none" },
        // 行やページャーの区切り、本文の h2 の上
        default: { value: "1px solid {colors.border.default}" },
        // セクションの見出し、ヘッダー、著者の上
        strong: { value: "1px solid {colors.border.strong}" },
        // 引用の左
        quote: { value: "2px solid {colors.border.default}" },
        // フォーカスの輪
        focus: { value: "2px solid {colors.border.strong}" },
      },
      sizes: {
        // 本文の幅。左右の余白を含む
        content: { value: { base: "640px", md: "688px" } },
        // タップできるリンクの高さ
        tapTarget: { value: "44px" },
        // ヘッダーの高さ
        header: { value: { base: "52px", md: "56px" } },
        // 記事の行の、日付の列の幅。表記の長さで決まる
        dateColumn: {
          full: { value: "88px" },
          monthDay: { value: "48px" },
        },
        // 本文の画像の幅。モバイルは左右の余白を打ち消して端まで、PC は本文の幅
        proseImage: { value: { base: "calc(100% + {spacing.gutter} * 2)", md: "100%" } },
      },
      spacing: {
        none: { value: "0" },
        // 本文の左右の余白
        gutter: { value: { base: "16px", md: "24px" } },
        // フォーカスの輪と要素の間
        focusOffset: { value: "2px" },
        // トップと一覧
        page: {
          top: { value: { base: "28px", md: "48px" } },
          // セクションの間
          gap: { value: { base: "40px", md: "48px" } },
        },
        article: {
          top: { value: { base: "28px", md: "56px" } },
          // 日付と題の間
          headerGap: { value: { base: "8px", md: "10px" } },
          // 題と本文の間
          headerBottom: { value: { base: "28px", md: "40px" } },
        },
        // 記事の本文
        prose: {
          // 段落の間
          gap: { value: { base: "20px", md: "22px" } },
          // h2 の上に足す分
          h2Top: { value: { base: "12px", md: "18px" } },
          // h2 の上の線と文字の間
          h2PaddingTop: { value: { base: "20px", md: "24px" } },
          // h3 の上に足す分
          h3Top: { value: "8px" },
          // 見出しと、その下の段落の間を詰める分。負の値（-prose.headingPull）で使う
          headingPull: { value: "6px" },
          listIndent: { value: "1.5em" },
          listGap: { value: "8px" },
          quoteIndent: { value: "16px" },
          // pre の上下に足す分
          preMargin: { value: { base: "4px", md: "6px" } },
          prePadding: { value: { base: "16px", md: "20px" } },
          inlineCodeX: { value: "4px" },
          inlineCodeY: { value: "2px" },
        },
        // ページのフッターと、記事の下のまとまり
        footer: {
          top: { value: { base: "44px", md: "64px" } },
          bottom: { value: { base: "40px", md: "56px" } },
          gap: { value: { base: "32px", md: "40px" } },
        },
        author: {
          top: { value: { base: "20px", md: "24px" } },
          gap: { value: "6px" },
        },
        featured: {
          top: { value: { base: "20px", md: "24px" } },
          titleTop: { value: { base: "6px", md: "8px" } },
          titleBottom: { value: { base: "12px", md: "14px" } },
          moreTop: { value: "4px" },
        },
        // 記事の行。モバイルは日付と題を縦に、PC は横に並べる
        row: {
          gap: { value: { base: "2px", md: "24px" } },
          paddingBlock: { value: { base: "12px", md: "13px" } },
        },
        pager: {
          // ラベルと題の間
          gap: { value: "2px" },
          // PC での 2 列の間
          columnGap: { value: "24px" },
          // PC での上下
          paddingBlock: { value: "16px" },
          // モバイルでの 1 件の上下。PC では取らない
          itemPaddingBlock: { value: { base: "12px", md: "0" } },
        },
        section: {
          headingBottom: { value: "12px" },
          footerTop: { value: "8px" },
        },
        header: {
          // サイト名、読み込み中の表示、リンクの間
          gap: { value: "16px" },
        },
      },
    },
    // 行送り（lineHeight）は文字の大きさに対する倍率で書く。
    // デザインの「行送り px ÷ 文字 px」を小数 4 桁で切り上げた値で、コメントの「文字/行送り」が元の px。
    // 切り捨てると行の高さが元の px に僅かに届かず、文字が 1px ずれる
    textStyles: {
      // ページの題。24/34 → 30/44
      pageTitle: {
        value: {
          fontSize: { base: "24px", md: "30px" },
          lineHeight: { base: 1.4167, md: 1.4667 },
          fontWeight: 500,
        },
      },
      // 最新の記事の題。22/32 → 26/40
      featuredTitle: {
        value: {
          fontSize: { base: "22px", md: "26px" },
          lineHeight: { base: 1.4546, md: 1.5385 },
          fontWeight: 500,
        },
      },
      // 本文の h2。19/30 → 22/34
      heading2: {
        value: {
          fontSize: { base: "19px", md: "22px" },
          lineHeight: { base: 1.579, md: 1.5455 },
          fontWeight: 500,
        },
      },
      // 本文の h3。17/28 → 19/30
      heading3: {
        value: {
          fontSize: { base: "17px", md: "19px" },
          lineHeight: { base: 1.6471, md: 1.579 },
          fontWeight: 500,
        },
      },
      // 本文と抜粋
      body: {
        value: {
          fontSize: { base: "16px", md: "17px" },
          lineHeight: { base: 1.75, md: 1.8 },
        },
      },
      // 記事の行の題。16/26 → 17/26
      rowTitle: {
        value: {
          fontSize: { base: "16px", md: "17px" },
          lineHeight: { base: 1.625, md: 1.5295 },
        },
      },
      // ページの最初の紹介文。14/26 → 15/26
      lead: {
        value: {
          fontSize: { base: "14px", md: "15px" },
          lineHeight: { base: 1.8572, md: 1.7334 },
        },
      },
      // 本文のコードブロック。13/21 → 14/23
      code: {
        value: {
          fontSize: { base: "13px", md: "14px" },
          lineHeight: { base: 1.6154, md: 1.6429 },
        },
      },
      // 本文の中のコード。まわりの文字に対する比
      inlineCode: { value: { fontSize: "0.9em" } },
      // 記事の行の日付。12/20 → 13/26
      rowDate: {
        value: {
          fontSize: { base: "12px", md: "13px" },
          lineHeight: { base: 1.6667, md: 2 },
          letterSpacing: "0.06em",
        },
      },
      // 前後の記事の題。15/24
      subTitle: { value: { fontSize: "15px", lineHeight: 1.6 } },
      // 著者の名前。15/24
      authorName: { value: { fontSize: "15px", lineHeight: 1.6, fontWeight: 500 } },
      // ヘッダーのサイト名
      siteName: { value: { fontSize: "15px", fontWeight: 500, letterSpacing: "0.04em" } },
      // セクションの見出し。13/20
      sectionHeading: {
        value: { fontSize: "13px", lineHeight: 1.5385, fontWeight: 500, letterSpacing: "0.08em" },
      },
      // 日付。13/20
      meta: { value: { fontSize: "13px", lineHeight: 1.5385, letterSpacing: "0.06em" } },
      // 「書いた人」「前の記事」などのラベル。12/20
      label: { value: { fontSize: "12px", lineHeight: 1.6667, letterSpacing: "0.08em" } },
      // 「一覧」「すべての記事」などの小さいリンク
      smallLink: { value: { fontSize: "13px", letterSpacing: "0.04em" } },
      // ページのフッター。12/20
      footnote: { value: { fontSize: "12px", lineHeight: 1.6667, letterSpacing: "0.06em" } },
    },
  },
  globalCss: {
    "*, *::before, *::after": { boxSizing: "border-box" },
    body: {
      margin: "none",
      background: "bg.default",
      color: "fg.default",
      fontFamily: "body",
      WebkitFontSmoothing: "antialiased",
    },
    a: { color: "fg.default" },
    "a:hover": { color: "fg.muted" },
    ":focus-visible": { outline: "focus", outlineOffset: "focusOffset" },
  },
});
