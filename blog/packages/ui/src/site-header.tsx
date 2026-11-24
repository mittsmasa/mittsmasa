import { css } from "../styled-system/css";

type Props = {
  siteName: string;
  topHref: string;
  loading?: boolean;
  darkMode: boolean;
  onDarkModeChange: (darkMode: boolean) => void;
};

const headerLink = css({
  display: "flex",
  alignItems: "center",
  height: "tapTarget",
  textDecoration: "none",
});

const themeIcon = css({ width: "icon", height: "icon" });

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${themeIcon} ${css({ _dark: { display: "none" } })}`}
    >
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={`${themeIcon} ${css({ display: "none", _dark: { display: "block" } })}`}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </svg>
  );
}

export function SiteHeader({
  siteName,
  topHref,
  loading = false,
  darkMode,
  onDarkModeChange,
}: Props) {
  return (
    <header
      className={css({
        maxWidth: { base: "content", md: "none" },
        marginInline: "auto",
        borderBottom: "strong",
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "header",
          maxWidth: "content",
          marginInline: "auto",
          paddingInline: "gutter",
        })}
      >
        <a href={topHref} className={`${headerLink} ${css({ textStyle: "siteName" })}`}>
          {siteName}
        </a>
        <p
          role="status"
          className={css({
            margin: "none",
            marginLeft: "header.gap",
            marginRight: "auto",
            textStyle: "label",
            color: "fg.muted",
          })}
        >
          {loading ? "読み込み中…" : ""}
        </p>
        <button
          type="button"
          aria-label="ダークモード"
          aria-pressed={darkMode}
          onClick={() => onDarkModeChange(!darkMode)}
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "tapTarget",
            height: "tapTarget",
            marginRight: "-header.iconPull",
            padding: "none",
            border: "none",
            background: "transparent",
            color: "fg.default",
            cursor: "pointer",
            _hover: { color: "fg.muted" },
          })}
        >
          <MoonIcon />
          <SunIcon />
        </button>
      </div>
    </header>
  );
}
