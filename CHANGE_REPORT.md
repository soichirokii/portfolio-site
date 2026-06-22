# 変更レポート

更新日: 2026-06-22

## 対応内容

- HOME の `WORKS` `ABOUT` `CONTACT` 見出しサイズを少し大きく調整
- `BEElog` ピックアップ内で、本文とボタンの下にある進行ドットが近すぎて崩れて見える箇所を修正
- サイトのメタ情報を `Soichiro Kii | Portfolio` と `城井総一郎のポートフォリオです。` に更新
- サイトアイコンを `src/app/icon.png` に差し替え
- 旧試作と旧静的ファイルを整理し、ルート直下を `site` 中心の構成に整理
- 整理後に本番ビルドで動作確認を実施

## 変更方針

- 既存レイアウトや構造は変えず、必要最小限の変更のみ実施
- 見た目の修正はスタイル調整に限定
- 文言とアイコンはメタ情報まわりのみ差し替え
- 不要ファイルの削除は、現行の `site` から参照されていないものに限定

## 変更ファイル

- `src/app/page.tsx`
- `src/components/BeelogSticky.tsx`
- `src/app/layout.tsx`
- `src/app/icon.png`

## 整理したファイル

- ルート直下の旧試作 `hero-app/` を削除
- 旧静的版の `index.html` を削除
- 旧静的版で使っていた `my_portfolio_pin.png` `pin_black.png` を削除
- 再生成可能なビルド成果物 `site/.next` を削除

## 現在のルート構成

- `.claude/`
- `site/`
- `start-portfolio.sh`
