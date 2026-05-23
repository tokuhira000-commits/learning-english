const STORAGE_KEY = "consulting-english-progress-v1";
const CUSTOM_KEY = "consulting-english-custom-v1";
const UNLOCK_KEY = "consulting-english-unlocks-v1";
const DAILY_GOAL = 10;
const DAILY_UNLOCK_COUNT = 10;

const baseTerms = [
  {
    id: "alignment",
    term: "alignment",
    translation: "認識合わせ、方向性の一致",
    category: "Client",
    level: "Core",
    definition: "関係者の理解、期待値、優先順位をそろえること。",
    example: "Let's get alignment on the decision criteria before we finalize the recommendation.",
    context: "提案前、ステアリングコミッティ、上位者レビュー",
    nuance: "単なる同意ではなく、判断軸や次の動きまでそろえる響きがあります。",
  },
  {
    id: "hypothesis",
    term: "hypothesis",
    translation: "仮説",
    category: "Strategy",
    level: "Core",
    definition: "分析を進めるための暫定的な見立て。",
    example: "Our working hypothesis is that churn is driven by onboarding friction.",
    context: "問題構造化、分析設計、インタビュー設計",
    nuance: "working hypothesis と言うと、検証前提の柔らかい表現になります。",
  },
  {
    id: "workstream",
    term: "workstream",
    translation: "作業領域、検討チーム",
    category: "Delivery",
    level: "Core",
    definition: "大きなプロジェクトを分けた検討・実行単位。",
    example: "The pricing workstream will share its findings in Friday's readout.",
    context: "PMO、週次報告、タスク分担",
    nuance: "task よりも責任範囲と継続的な作業単位を含みます。",
  },
  {
    id: "readout",
    term: "readout",
    translation: "報告会、結果共有",
    category: "Client",
    level: "Core",
    definition: "分析結果や進捗を関係者に説明する場。",
    example: "We should keep the readout focused on implications, not raw analysis.",
    context: "クライアント報告、役員向け共有、調査結果説明",
    nuance: "単なる読み上げではなく、示唆の共有というニュアンスです。",
  },
  {
    id: "takeaway",
    term: "takeaway",
    translation: "要点、持ち帰るべき示唆",
    category: "Client",
    level: "Core",
    definition: "議論や分析から相手が理解すべき主要メッセージ。",
    example: "The key takeaway is that retention improves when customers see value in week one.",
    context: "プレゼン、会議の締め、メール要約",
    nuance: "summary よりも、意思決定に効く学びを指します。",
  },
  {
    id: "trade-off",
    term: "trade-off",
    translation: "トレードオフ、両立しにくい選択",
    category: "Strategy",
    level: "Core",
    definition: "一方を優先すると他方に制約や損失が出る関係。",
    example: "There is a trade-off between speed to market and operational readiness.",
    context: "戦略オプション評価、ロードマップ検討",
    nuance: "意思決定の緊張関係を中立的に表せます。",
  },
  {
    id: "scope",
    term: "scope",
    translation: "対象範囲、作業範囲",
    category: "Delivery",
    level: "Core",
    definition: "プロジェクトや分析で扱う範囲。",
    example: "Customer support redesign is out of scope for this phase.",
    context: "提案書、キックオフ、変更管理",
    nuance: "out of scope は角を立てずに対象外を示す定番表現です。",
  },
  {
    id: "deliverable",
    term: "deliverable",
    translation: "成果物",
    category: "Delivery",
    level: "Core",
    definition: "クライアントやチームに提出する具体的なアウトプット。",
    example: "The final deliverable will include the business case and implementation roadmap.",
    context: "契約、提案、プロジェクト計画",
    nuance: "資料だけでなく、モデルやツールなども含められます。",
  },
  {
    id: "stakeholder",
    term: "stakeholder",
    translation: "利害関係者、関係者",
    category: "Leadership",
    level: "Core",
    definition: "意思決定や実行に影響する人・組織。",
    example: "We need to map the stakeholders before scheduling executive interviews.",
    context: "変革プロジェクト、合意形成、組織設計",
    nuance: "decision maker、influencer、owner などに分けて話すと具体的です。",
  },
  {
    id: "buy-in",
    term: "buy-in",
    translation: "納得感、賛同",
    category: "Leadership",
    level: "Core",
    definition: "関係者が提案や方針を受け入れ、前向きに支える状態。",
    example: "Without regional buy-in, the new operating model will be hard to implement.",
    context: "変革、導入計画、経営層説明",
    nuance: "approval よりも心理的な納得と実行意欲を含みます。",
  },
  {
    id: "current-state",
    term: "current state",
    translation: "現状",
    category: "Analytics",
    level: "Core",
    definition: "現在の業務、組織、数値、顧客体験の状態。",
    example: "The current-state assessment shows duplicated handoffs across regions.",
    context: "現状分析、業務改革、システム導入",
    nuance: "future state と対で使うと変革ストーリーが作りやすくなります。",
  },
  {
    id: "future-state",
    term: "future state",
    translation: "目指す姿、将来像",
    category: "Strategy",
    level: "Core",
    definition: "変革後に実現したい業務や組織の状態。",
    example: "The future state should reduce manual reconciliation and improve accountability.",
    context: "業務設計、DX、組織変革",
    nuance: "ideal state より実装を見据えた現実的な表現です。",
  },
  {
    id: "pain-point",
    term: "pain point",
    translation: "課題、困りごと",
    category: "Client",
    level: "Core",
    definition: "顧客や業務担当者が感じている具体的な不満や障害。",
    example: "The biggest pain point is the lack of visibility into inventory levels.",
    context: "インタビュー、顧客体験、業務調査",
    nuance: "problem よりも現場の痛みや実感に寄った言い方です。",
  },
  {
    id: "root-cause",
    term: "root cause",
    translation: "根本原因",
    category: "Analytics",
    level: "Core",
    definition: "表面的な問題の背後にある本質的な原因。",
    example: "The root cause is not demand volatility but the weekly replenishment cadence.",
    context: "原因分析、業務改善、品質改善",
    nuance: "symptom と対比して使うと、分析の深さが伝わります。",
  },
  {
    id: "deep-dive",
    term: "deep dive",
    translation: "詳細分析、深掘り",
    category: "Analytics",
    level: "Core",
    definition: "特定テーマを細かく掘り下げて調べること。",
    example: "Let's do a deep dive on the underperforming segments.",
    context: "分析計画、週次レビュー、追加調査",
    nuance: "カジュアルですが、ビジネス会議でもよく使われます。",
  },
  {
    id: "benchmark",
    term: "benchmark",
    translation: "比較基準、ベンチマーク",
    category: "Analytics",
    level: "Core",
    definition: "自社の状態を評価するための比較対象。",
    example: "We benchmarked SG&A ratios against five global peers.",
    context: "競合比較、財務分析、オペレーション診断",
    nuance: "peer benchmark なら同業比較の意味が明確になります。",
  },
  {
    id: "market-sizing",
    term: "market sizing",
    translation: "市場規模推計",
    category: "Strategy",
    level: "Core",
    definition: "対象市場の大きさを定量的に見積もること。",
    example: "The market sizing suggests a serviceable opportunity of $1.2 billion.",
    context: "新規事業、参入戦略、投資検討",
    nuance: "TAM、SAM、SOM と一緒に使われることが多いです。",
  },
  {
    id: "go-to-market",
    term: "go-to-market",
    translation: "市場投入、販売展開戦略",
    category: "Strategy",
    level: "Core",
    definition: "製品やサービスを市場に届けるための顧客、チャネル、価格、営業設計。",
    example: "The go-to-market plan should prioritize enterprise accounts in year one.",
    context: "新規事業、営業戦略、製品ローンチ",
    nuance: "GTM と略されることが多く、販売の実行設計まで含みます。",
  },
  {
    id: "value-proposition",
    term: "value proposition",
    translation: "価値提案",
    category: "Strategy",
    level: "Core",
    definition: "顧客にとっての明確な提供価値。",
    example: "The value proposition needs to be sharper for mid-market customers.",
    context: "事業戦略、商品企画、営業資料",
    nuance: "feature ではなく、顧客が得る成果に寄せて表現します。",
  },
  {
    id: "business-case",
    term: "business case",
    translation: "投資対効果、事業上の根拠",
    category: "Finance",
    level: "Core",
    definition: "施策や投資を正当化するための便益、費用、リスク、前提。",
    example: "The business case depends on a 12-month payback period.",
    context: "投資判断、提案、役員承認",
    nuance: "case は事例ではなく、意思決定の論拠という意味です。",
  },
  {
    id: "uplift",
    term: "uplift",
    translation: "改善幅、上振れ効果",
    category: "Finance",
    level: "Core",
    definition: "施策によって増える売上、利益、KPIなどの改善分。",
    example: "We estimate a 6% revenue uplift from improved cross-sell conversion.",
    context: "施策効果、財務インパクト、KPI改善",
    nuance: "increase よりも施策由来の改善という含みがあります。",
  },
  {
    id: "run-rate",
    term: "run rate",
    translation: "年換算ペース、現状ペース",
    category: "Finance",
    level: "Core",
    definition: "現在の実績を年間など一定期間に換算した水準。",
    example: "The current run rate implies $80 million in annual recurring revenue.",
    context: "売上分析、SaaS、業績説明",
    nuance: "一時要因がある場合は、前提を添えると安全です。",
  },
  {
    id: "margin",
    term: "margin",
    translation: "利益率、余地",
    category: "Finance",
    level: "Core",
    definition: "売上に対する利益の割合、または改善余地。",
    example: "Margin pressure is coming from higher logistics costs.",
    context: "財務分析、収益改善、価格戦略",
    nuance: "gross margin、operating margin で意味が変わります。",
  },
  {
    id: "unit-economics",
    term: "unit economics",
    translation: "単位あたり採算性",
    category: "Finance",
    level: "Advanced",
    definition: "顧客一人、店舗一店、注文一件など単位ごとの収益性。",
    example: "The unit economics improve materially once utilization exceeds 70%.",
    context: "新規事業、SaaS、マーケットプレイス、店舗展開",
    nuance: "規模拡大前に事業が健全かを示す重要語です。",
  },
  {
    id: "sensitivity-analysis",
    term: "sensitivity analysis",
    translation: "感度分析",
    category: "Finance",
    level: "Advanced",
    definition: "前提条件が変わったときに結果がどう変わるかを見る分析。",
    example: "The sensitivity analysis shows that adoption rate is the biggest driver of NPV.",
    context: "投資評価、財務モデル、リスク説明",
    nuance: "key driver と組み合わせると、意思決定ポイントが明確です。",
  },
  {
    id: "assumption",
    term: "assumption",
    translation: "前提",
    category: "Analytics",
    level: "Core",
    definition: "分析や計画で置いている条件。",
    example: "Let's make the adoption assumptions explicit on the slide.",
    context: "モデル、提案資料、レビュー",
    nuance: "hidden assumption は見落とされた前提という意味で便利です。",
  },
  {
    id: "driver",
    term: "driver",
    translation: "主要因、押し上げ要因",
    category: "Analytics",
    level: "Core",
    definition: "結果に大きく影響する要因。",
    example: "Price realization is the main driver of the margin improvement.",
    context: "KPI分解、財務分析、施策評価",
    nuance: "原因全般より、数値を動かす主要因として使われます。",
  },
  {
    id: "kpi",
    term: "KPI",
    translation: "重要業績指標",
    category: "Analytics",
    level: "Core",
    definition: "目標達成状況を測る主要な指標。",
    example: "We should distinguish outcome KPIs from activity metrics.",
    context: "事業管理、ダッシュボード、業績改善",
    nuance: "metric よりも、管理上重要な指標という位置づけです。",
  },
  {
    id: "dashboard",
    term: "dashboard",
    translation: "管理画面、指標一覧",
    category: "Analytics",
    level: "Core",
    definition: "重要な指標や状況を一覧できる画面や資料。",
    example: "The dashboard needs to highlight exceptions, not just report averages.",
    context: "経営管理、営業管理、DX",
    nuance: "見える化だけでなく、意思決定につながる設計が問われます。",
  },
  {
    id: "granularity",
    term: "granularity",
    translation: "粒度",
    category: "Analytics",
    level: "Advanced",
    definition: "データや分析をどの細かさで見るか。",
    example: "We need transaction-level granularity to isolate the issue.",
    context: "データ分析、KPI分解、業務調査",
    nuance: "level of detail と言い換えられます。",
  },
  {
    id: "material",
    term: "material",
    translation: "重要な、無視できない",
    category: "Finance",
    level: "Advanced",
    definition: "意思決定や結果に影響するほど重要であること。",
    example: "The impact is material enough to include in the executive summary.",
    context: "財務、リスク、役員向け報告",
    nuance: "important よりもビジネス・財務上の重要性を帯びます。",
  },
  {
    id: "mitigate",
    term: "mitigate",
    translation: "軽減する、抑える",
    category: "Leadership",
    level: "Core",
    definition: "リスクや悪影響を小さくすること。",
    example: "We can mitigate implementation risk through a phased rollout.",
    context: "リスク管理、実行計画、変革",
    nuance: "eliminate ではなく、現実的に下げる意味です。",
  },
  {
    id: "phased-rollout",
    term: "phased rollout",
    translation: "段階的展開",
    category: "Delivery",
    level: "Core",
    definition: "一度に全体展開せず、段階を分けて導入すること。",
    example: "A phased rollout will help us test the operating model before scaling.",
    context: "実行計画、システム導入、組織変革",
    nuance: "pilot、scale-up と一緒に使いやすい表現です。",
  },
  {
    id: "roadmap",
    term: "roadmap",
    translation: "実行計画、ロードマップ",
    category: "Delivery",
    level: "Core",
    definition: "目標達成までの主要ステップと時系列。",
    example: "The roadmap should sequence quick wins before platform modernization.",
    context: "提案、変革計画、IT戦略",
    nuance: "単なるスケジュールではなく、優先順位と依存関係を含みます。",
  },
  {
    id: "quick-win",
    term: "quick win",
    translation: "早期成果",
    category: "Delivery",
    level: "Core",
    definition: "短期間で実現でき、効果が見えやすい施策。",
    example: "Automating the manual report is a quick win with visible productivity benefits.",
    context: "変革初期、改善施策、実行計画",
    nuance: "大きな構造改革の前に勢いを作る文脈で使われます。",
  },
  {
    id: "operating-model",
    term: "operating model",
    translation: "業務運営モデル",
    category: "Strategy",
    level: "Advanced",
    definition: "組織、プロセス、権限、システムの動き方を定義したもの。",
    example: "The target operating model clarifies decision rights across regions.",
    context: "組織変革、業務改革、グローバル展開",
    nuance: "org chart より広く、仕事の回り方全体を指します。",
  },
  {
    id: "decision-rights",
    term: "decision rights",
    translation: "意思決定権限",
    category: "Leadership",
    level: "Advanced",
    definition: "誰がどの判断を下す権限を持つか。",
    example: "Ambiguous decision rights are slowing down regional execution.",
    context: "ガバナンス、組織設計、役割分担",
    nuance: "approval flow よりも責任と権限の設計に近い表現です。",
  },
  {
    id: "governance",
    term: "governance",
    translation: "管理体制、意思決定体制",
    category: "Leadership",
    level: "Core",
    definition: "意思決定、監督、報告、責任分担の仕組み。",
    example: "We need a governance model that keeps the transformation on track.",
    context: "PMO、変革、役員会報告",
    nuance: "単なる管理ではなく、継続的に動かす仕組みです。",
  },
  {
    id: "escalate",
    term: "escalate",
    translation: "上位者に上げる、重要問題として扱う",
    category: "Leadership",
    level: "Core",
    definition: "解決に上位判断が必要な問題を適切な人に上げること。",
    example: "We should escalate the dependency risk before it affects the launch date.",
    context: "プロジェクト管理、リスク、クライアント対応",
    nuance: "悪い意味だけでなく、適切な意思決定に上げるという実務語です。",
  },
  {
    id: "pushback",
    term: "pushback",
    translation: "反発、懸念、異議",
    category: "Client",
    level: "Core",
    definition: "提案や変更に対する反応、抵抗、質問。",
    example: "We may get pushback from sales if the pricing change is not clearly justified.",
    context: "クライアント会議、変革、営業戦略",
    nuance: "criticism よりも、相手の立場から出る懸念という柔らかい表現です。",
  },
  {
    id: "constraint",
    term: "constraint",
    translation: "制約",
    category: "Delivery",
    level: "Core",
    definition: "選択肢や実行を制限する条件。",
    example: "The main constraint is the availability of clean customer data.",
    context: "計画、分析、実行課題",
    nuance: "issue よりも、設計上考慮すべき条件として言えます。",
  },
  {
    id: "dependency",
    term: "dependency",
    translation: "依存関係",
    category: "Delivery",
    level: "Core",
    definition: "ある作業が別の作業や判断に依存している状態。",
    example: "The data migration is a critical dependency for the launch.",
    context: "プロジェクト計画、PMO、システム導入",
    nuance: "critical dependency は遅れると全体に効く依存関係です。",
  },
  {
    id: "backlog",
    term: "backlog",
    translation: "未処理リスト、優先タスク一覧",
    category: "Delivery",
    level: "Core",
    definition: "今後対応すべき項目をためて優先順位づけしたリスト。",
    example: "Let's move the lower-priority items to the post-launch backlog.",
    context: "アジャイル、システム導入、改善活動",
    nuance: "単なる残作業ではなく、管理された候補リストです。",
  },
  {
    id: "cadence",
    term: "cadence",
    translation: "定例の頻度、運営リズム",
    category: "Delivery",
    level: "Advanced",
    definition: "会議、報告、作業サイクルの定期的なリズム。",
    example: "A weekly governance cadence will help surface blockers early.",
    context: "PMO、会議体、変革運営",
    nuance: "frequency よりも、運営のリズムや型を含みます。",
  },
  {
    id: "north-star",
    term: "North Star metric",
    translation: "最重要指標",
    category: "Strategy",
    level: "Advanced",
    definition: "事業の価値創出を最もよく表す中心指標。",
    example: "For this platform, active teams may be a better North Star metric than sign-ups.",
    context: "成長戦略、プロダクト、SaaS",
    nuance: "KPIの中でも、意思決定を導く中心的な指標です。",
  },
  {
    id: "white-space",
    term: "white space",
    translation: "未開拓領域、機会領域",
    category: "Strategy",
    level: "Advanced",
    definition: "競合や既存施策が十分に届いていない成長機会。",
    example: "The white space appears to be in bundled services for mid-sized enterprises.",
    context: "市場分析、新規事業、顧客セグメント",
    nuance: "空白というより、まだ取り切れていない機会の意味です。",
  },
  {
    id: "edge-case",
    term: "edge case",
    translation: "例外ケース、特殊ケース",
    category: "Analytics",
    level: "Advanced",
    definition: "一般的ではないが、設計や分析上無視できないケース。",
    example: "We should separate edge cases from patterns that affect the core process.",
    context: "業務設計、システム要件、分析",
    nuance: "全体方針を特殊ケースに引っ張られすぎない時にも使えます。",
  },
  {
    id: "synthesize",
    term: "synthesize",
    translation: "統合して示唆化する",
    category: "Analytics",
    level: "Advanced",
    definition: "複数の情報をまとめ、意味のある結論にすること。",
    example: "We need to synthesize the interview findings into three implications.",
    context: "インタビュー分析、提案資料、調査報告",
    nuance: "summarize より一段深く、意味づけまで含みます。",
  },
  {
    id: "implication",
    term: "implication",
    translation: "示唆、意味合い",
    category: "Analytics",
    level: "Core",
    definition: "事実や分析結果が意思決定に与える意味。",
    example: "The implication is that we should shift investment from acquisition to retention.",
    context: "分析結果、プレゼン、役員向け資料",
    nuance: "finding は発見、implication はそこから何をすべきかに近いです。",
  },
  {
    id: "strawman",
    term: "strawman",
    translation: "たたき台",
    category: "Client",
    level: "Advanced",
    definition: "議論を始めるための仮案。",
    example: "We prepared a strawman roadmap to pressure-test with the leadership team.",
    context: "資料作成、ワークショップ、方針議論",
    nuance: "未完成だが議論可能な案として出す時に便利です。",
  },
  {
    id: "pressure-test",
    term: "pressure-test",
    translation: "厳しめに検証する",
    category: "Strategy",
    level: "Advanced",
    definition: "仮説や案が現実に耐えるかを強い条件で確認すること。",
    example: "Let's pressure-test the revenue assumptions with the sales leadership team.",
    context: "仮説検証、財務モデル、役員レビュー",
    nuance: "test よりも、反論や厳しい前提に耐えるかを見る響きです。",
  },
  {
    id: "socialize",
    term: "socialize",
    translation: "事前に共有して反応を見る",
    category: "Client",
    level: "Advanced",
    definition: "正式な場の前に関係者へ案を共有し、理解や懸念を確認すること。",
    example: "We should socialize the recommendation with Finance before the steering committee.",
    context: "合意形成、役員会準備、クライアント対応",
    nuance: "inform よりも、根回しに近い実務的な表現です。",
  },
  {
    id: "ask",
    term: "ask",
    translation: "依頼事項、求める判断",
    category: "Client",
    level: "Core",
    definition: "会議や資料で相手に求める具体的な行動や判断。",
    example: "Our ask today is approval to proceed with the pilot.",
    context: "役員会、提案、意思決定会議",
    nuance: "request よりも会議の結論として求めることを端的に言えます。",
  },
  {
    id: "next-steps",
    term: "next steps",
    translation: "次のアクション",
    category: "Delivery",
    level: "Core",
    definition: "会議や分析の後に進める具体的な作業。",
    example: "The next steps are to validate the savings estimate and align on owners.",
    context: "会議の締め、議事録、プロジェクト管理",
    nuance: "action items と近く、担当者と期限を添えると実務的です。",
  },
  {
    id: "owner",
    term: "owner",
    translation: "責任者、担当オーナー",
    category: "Delivery",
    level: "Core",
    definition: "特定の作業や意思決定に責任を持つ人。",
    example: "Can we assign an owner for each dependency before the next checkpoint?",
    context: "PMO、会議、タスク管理",
    nuance: "担当者というより、結果に責任を持つ人という強さがあります。",
  },
  {
    id: "blocker",
    term: "blocker",
    translation: "進行を止める障害",
    category: "Delivery",
    level: "Core",
    definition: "作業を前に進められない重大な障害。",
    example: "The missing data extract is the main blocker for the churn analysis.",
    context: "進捗報告、PMO、分析作業",
    nuance: "issue よりも、今すぐ解消しないと進めないものです。",
  },
  {
    id: "calibrate",
    term: "calibrate",
    translation: "基準を合わせる、調整する",
    category: "Client",
    level: "Advanced",
    definition: "期待値、判断基準、表現の強さを調整すること。",
    example: "Let's calibrate the message before sharing it with the CEO.",
    context: "上位者レビュー、資料作成、クライアント対応",
    nuance: "align よりも、精度やトーンを微調整するニュアンスです。",
  },
];

const phraseSets = {
  "会議を進める": [
    {
      title: "合意形成",
      phrase: "Before we move forward, can we align on the decision criteria?",
      meaning: "先に進む前に、判断基準をそろえられますか。",
    },
    {
      title: "論点を戻す",
      phrase: "Let's bring this back to the core question.",
      meaning: "この議論を中核の問いに戻しましょう。",
    },
    {
      title: "判断を求める",
      phrase: "The ask today is to confirm whether we proceed with the pilot.",
      meaning: "本日お願いしたい判断は、パイロットに進むかどうかです。",
    },
  ],
  "分析を説明する": [
    {
      title: "示唆を置く",
      phrase: "The implication is that retention, not acquisition, should be the near-term priority.",
      meaning: "示唆としては、短期的には獲得より維持を優先すべきということです。",
    },
    {
      title: "前提を明示する",
      phrase: "This estimate is based on three assumptions that we should pressure-test.",
      meaning: "この推計は、検証すべき3つの前提に基づいています。",
    },
    {
      title: "粒度をそろえる",
      phrase: "We may need a lower level of granularity to isolate the driver.",
      meaning: "主要因を特定するには、より細かい粒度が必要かもしれません。",
    },
  ],
  "クライアント対応": [
    {
      title: "懸念を受け止める",
      phrase: "That's a fair concern. We can mitigate that risk through a phased rollout.",
      meaning: "もっともな懸念です。そのリスクは段階的展開で軽減できます。",
    },
    {
      title: "事前共有",
      phrase: "We should socialize the recommendation with Finance before the steering committee.",
      meaning: "ステコミ前に、財務部門へ提案を事前共有しておくべきです。",
    },
    {
      title: "範囲を整理する",
      phrase: "That topic is important, but it is outside the scope of this phase.",
      meaning: "その論点は重要ですが、今回フェーズの対象範囲外です。",
    },
  ],
  "プロジェクト運営": [
    {
      title: "障害を共有する",
      phrase: "The data extract is a blocker, so we should escalate it today.",
      meaning: "データ抽出が障害になっているため、本日中に上位へ上げるべきです。",
    },
    {
      title: "依存関係",
      phrase: "The roadmap needs to reflect the key dependencies across workstreams.",
      meaning: "ロードマップには作業領域間の主要な依存関係を反映する必要があります。",
    },
    {
      title: "次アクション",
      phrase: "Let's close with owners and next steps for each open item.",
      meaning: "各未決事項について責任者と次のアクションを決めて締めましょう。",
    },
  ],
};

const categoryColors = {
  Strategy: "#6d5bd0",
  Client: "#0f766e",
  Analytics: "#2563eb",
  Finance: "#c2410c",
  Delivery: "#15803d",
  Leadership: "#b7791f",
};

const katakanaPronunciations = {
  alignment: "アラインメント",
  hypothesis: "ハイポセシス",
  workstream: "ワークストリーム",
  readout: "リードアウト",
  takeaway: "テイクアウェイ",
  "trade-off": "トレードオフ",
  scope: "スコープ",
  deliverable: "デリバラブル",
  stakeholder: "ステークホルダー",
  "buy-in": "バイイン",
  "current-state": "カレント・ステート",
  "future-state": "フューチャー・ステート",
  "pain-point": "ペインポイント",
  "root-cause": "ルートコーズ",
  "deep-dive": "ディープダイブ",
  benchmark: "ベンチマーク",
  "market-sizing": "マーケットサイジング",
  "go-to-market": "ゴー・トゥー・マーケット",
  "value-proposition": "バリュー・プロポジション",
  "business-case": "ビジネスケース",
  uplift: "アップリフト",
  "run-rate": "ランレート",
  margin: "マージン",
  "unit-economics": "ユニット・エコノミクス",
  "sensitivity-analysis": "センシティビティ・アナリシス",
  assumption: "アサンプション",
  driver: "ドライバー",
  kpi: "ケー・ピー・アイ",
  dashboard: "ダッシュボード",
  granularity: "グラニュラリティ",
  material: "マテリアル",
  mitigate: "ミティゲイト",
  "phased-rollout": "フェイズド・ロールアウト",
  roadmap: "ロードマップ",
  "quick-win": "クイックウィン",
  "operating-model": "オペレーティング・モデル",
  "decision-rights": "ディシジョン・ライツ",
  governance: "ガバナンス",
  escalate: "エスカレイト",
  pushback: "プッシュバック",
  constraint: "コンストレイント",
  dependency: "ディペンデンシー",
  backlog: "バックログ",
  cadence: "ケイデンス",
  "north-star": "ノーススター・メトリック",
  "white-space": "ホワイトスペース",
  "edge-case": "エッジケース",
  synthesize: "シンセサイズ",
  implication: "インプリケーション",
  strawman: "ストローマン",
  "pressure-test": "プレッシャーテスト",
  socialize: "ソーシャライズ",
  ask: "アスク",
  "next-steps": "ネクストステップス",
  owner: "オーナー",
  blocker: "ブロッカー",
  calibrate: "キャリブレイト",
};

const coreImages = {
  alignment: "バラバラの矢印を同じ方向にそろえるイメージ。",
  hypothesis: "まだ確定していない答えの候補を、検証できる形で置くイメージ。",
  workstream: "大きな川から分かれた作業の流れを、それぞれ前に進めるイメージ。",
  readout: "分析結果を関係者の前に広げ、意味が伝わる形で共有するイメージ。",
  takeaway: "議論のあとに相手の手元へ残る、最も大事な持ち帰りポイント。",
  "trade-off": "片方を強めると、もう片方を少し手放す天秤のイメージ。",
  scope: "今回扱う範囲を線で囲い、内側と外側を分けるイメージ。",
  deliverable: "約束した成果を、相手に渡せる形にした具体物。",
  stakeholder: "意思決定や実行に影響する人たちを、地図上に配置するイメージ。",
  "buy-in": "相手が頭だけでなく気持ちでも納得し、前に進む力になるイメージ。",
  "current-state": "いまの業務や数字を、そのまま写真に撮るイメージ。",
  "future-state": "変革後に到達したい姿を、先に設計図として描くイメージ。",
  "pain-point": "現場や顧客が実際に痛みを感じている摩擦点。",
  "root-cause": "表面に出た症状の下にある、問題の根っこを掘り当てるイメージ。",
  "deep-dive": "水面の情報ではなく、深い層まで潜って調べるイメージ。",
  benchmark: "自社の位置を測るために、横に置く比較用のものさし。",
  "market-sizing": "市場という大きな器の容量を、前提を置いて測るイメージ。",
  "go-to-market": "商品を顧客の手元まで届ける道筋を設計するイメージ。",
  "value-proposition": "相手が本当に受け取る価値を、ひとことで差し出すイメージ。",
  "business-case": "投資や施策を進める理由を、数字と論理で支える土台。",
  uplift: "施策によって数値が上向きに持ち上がるイメージ。",
  "run-rate": "いまのペースをそのまま走らせたときの年間スピードメーター。",
  margin: "売上からコストを引いたあとに残る厚み。",
  "unit-economics": "顧客一人、注文一件など、最小単位で採算を見る虫眼鏡。",
  "sensitivity-analysis": "前提のつまみを動かし、結果がどれだけ揺れるか見るイメージ。",
  assumption: "分析や計画の下に敷いている見えにくい土台。",
  driver: "結果の数字を実際に動かしているエンジン。",
  kpi: "目標に近づいているかを示す計器盤の主要メーター。",
  dashboard: "重要な状態が一目でわかる操縦席のパネル。",
  granularity: "粗い地図から細かい地図へズームする粒の細かさ。",
  material: "意思決定を動かすほど重みのあるもの。",
  mitigate: "リスクをゼロにはしないが、衝撃を小さくするクッション。",
  "phased-rollout": "いきなり全面展開せず、段階ごとに広げる階段。",
  roadmap: "目的地までの順番、依存関係、道筋を描いた地図。",
  "quick-win": "短期間で成果が見え、勢いを作る小さな勝ち。",
  "operating-model": "組織、権限、プロセスがどう動くかを示す仕事の設計図。",
  "decision-rights": "誰がどの判断のハンドルを握るかを明確にするイメージ。",
  governance: "物事がぶれずに進むようにする、会議体・権限・報告の骨組み。",
  escalate: "現場で止めず、判断できる上位の場所へ持ち上げるイメージ。",
  pushback: "提案に対して返ってくる抵抗や押し返しの力。",
  constraint: "自由に動ける範囲を狭める条件や壁。",
  dependency: "ある作業が別の作業の完了を待っているつながり。",
  backlog: "今すぐではないが、優先順位をつけて控えている作業の棚。",
  cadence: "会議や報告が一定のリズムで回る鼓動。",
  "north-star": "多くの指標の中で、進む方向を示す一番上の星。",
  "white-space": "まだ誰も十分に取り切れていない余白の機会領域。",
  "edge-case": "中心から外れた例外だが、設計上は無視しきれない端のケース。",
  synthesize: "散らばった情報を束ね、意味のある結論に編み直すイメージ。",
  implication: "事実から一歩進んで、だから何をすべきかに変換した示唆。",
  strawman: "壊して直すために先に置く、議論用のたたき台。",
  "pressure-test": "案や前提に強い圧をかけ、壊れないか確かめるイメージ。",
  socialize: "正式決定の前に関係者へ回し、反応と納得感を育てるイメージ。",
  ask: "会議の最後に相手へ明確に差し出す依頼や判断事項。",
  "next-steps": "議論のあとに実際に足を踏み出す次の一歩。",
  owner: "その論点や作業のハンドルを持ち、結果に責任を持つ人。",
  blocker: "前に進む道をふさいでいる障害物。",
  calibrate: "基準やトーンを細かく調整し、目盛りを合わせるイメージ。",
};

let progress = loadJson(STORAGE_KEY, {});
let customTerms = loadJson(CUSTOM_KEY, []);
let unlockState = loadJson(UNLOCK_KEY, null);
let activeView = "dashboard";
let activeCategory = "all";
let activePhraseSet = Object.keys(phraseSets)[0];
let searchTerm = "";
let currentCardId = null;
let cardFlipped = false;

releaseDailyTerms();

let quiz = createQuiz();

const app = document.querySelector("#app");
const viewTitle = document.querySelector("#viewTitle");
const searchInput = document.querySelector("#searchInput");

function loadJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(customTerms));
  localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlockState));
}

function allTerms() {
  return [...unlockedBaseTerms(), ...customTerms];
}

function unlockedBaseTerms() {
  const unlocked = new Set(unlockState.unlockedBaseIds);
  return baseTerms.filter((item) => unlocked.has(item.id));
}

function lockedBaseTerms() {
  const unlocked = new Set(unlockState.unlockedBaseIds);
  return baseTerms.filter((item) => !unlocked.has(item.id));
}

function releaseDailyTerms() {
  const today = todayKey();
  const baseIds = baseTerms.map((item) => item.id);
  const savedIds = Array.isArray(unlockState?.unlockedBaseIds) ? unlockState.unlockedBaseIds : [];
  const validUnlockedIds = savedIds.filter((id) => baseIds.includes(id));
  const history = unlockState?.history && typeof unlockState.history === "object" ? unlockState.history : {};

  unlockState = {
    unlockedBaseIds: [...new Set(validUnlockedIds)],
    lastUnlockDate: typeof unlockState?.lastUnlockDate === "string" ? unlockState.lastUnlockDate : "",
    history,
  };

  if (unlockState.lastUnlockDate === today && Array.isArray(unlockState.history[today])) {
    return;
  }

  const unlocked = new Set(unlockState.unlockedBaseIds);
  const newIds = baseIds.filter((id) => !unlocked.has(id)).slice(0, DAILY_UNLOCK_COUNT);
  unlockState.unlockedBaseIds = [...unlockState.unlockedBaseIds, ...newIds];
  unlockState.lastUnlockDate = today;
  unlockState.history[today] = newIds;
  saveState();
}

function todayNewTerms() {
  const ids = unlockState.history?.[todayKey()] || [];
  const todayIds = new Set(ids);
  return baseTerms.filter((item) => todayIds.has(item.id));
}

function pronunciationFor(item) {
  return item.pronunciation || katakanaPronunciations[item.id] || "";
}

function coreImageFor(item) {
  return item.coreImage || coreImages[item.id] || "";
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function ensureProgress(id) {
  if (!progress[id]) {
    progress[id] = {
      attempts: 0,
      correct: 0,
      mastered: false,
      lastSeen: "",
      due: todayKey(),
      reviewedToday: 0,
    };
  }
  return progress[id];
}

function filteredTerms() {
  const needle = searchTerm.trim().toLowerCase();
  return allTerms().filter((item) => {
    const categoryOk = activeCategory === "all" || item.category === activeCategory;
    const text = `${item.term} ${item.translation} ${pronunciationFor(item)} ${coreImageFor(item)} ${item.definition} ${item.example} ${item.context}`.toLowerCase();
    return categoryOk && (!needle || text.includes(needle));
  });
}

function dueTerms() {
  const today = todayKey();
  return filteredTerms()
    .filter((item) => ensureProgress(item.id).due <= today || !ensureProgress(item.id).mastered)
    .sort((a, b) => {
      const pa = ensureProgress(a.id);
      const pb = ensureProgress(b.id);
      return pa.correct - pb.correct || pa.attempts - pb.attempts;
    });
}

function stats() {
  const items = allTerms();
  const entries = items.map((item) => ensureProgress(item.id));
  const reviewedToday = entries.reduce((sum, item) => {
    return sum + (item.lastSeen === todayKey() ? item.reviewedToday || 0 : 0);
  }, 0);
  const attempts = entries.reduce((sum, item) => sum + item.attempts, 0);
  const correct = entries.reduce((sum, item) => sum + item.correct, 0);
  return {
    total: items.length,
    baseTotal: baseTerms.length,
    unlockedBase: unlockedBaseTerms().length,
    remainingBase: lockedBaseTerms().length,
    newToday: todayNewTerms().length,
    mastered: entries.filter((item) => item.mastered).length,
    reviewedToday,
    due: dueTerms().length,
    accuracy: attempts ? Math.round((correct / attempts) * 100) : 0,
  };
}

function setView(view) {
  activeView = view;
  cardFlipped = false;
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });
  render();
}

function markTerm(id, isCorrect) {
  const item = ensureProgress(id);
  item.attempts += 1;
  item.correct += isCorrect ? 1 : 0;
  item.lastSeen = todayKey();
  item.reviewedToday = (item.reviewedToday || 0) + 1;
  item.mastered = item.correct >= 3 && item.correct / item.attempts >= 0.65;
  const next = new Date();
  const dayGap = isCorrect ? Math.min(14, Math.max(1, item.correct * 2)) : 1;
  next.setDate(next.getDate() + dayGap);
  item.due = next.toISOString().slice(0, 10);
  saveState();
  updateDailyProgress();
}

function getCurrentCard() {
  const candidates = dueTerms();
  if (!candidates.length) return filteredTerms()[0] || allTerms()[0] || baseTerms[0];
  if (!currentCardId || !candidates.some((item) => item.id === currentCardId)) {
    currentCardId = candidates[0].id;
  }
  return allTerms().find((item) => item.id === currentCardId) || candidates[0] || baseTerms[0];
}

function nextCard() {
  const candidates = dueTerms();
  if (!candidates.length) return;
  const index = Math.max(0, candidates.findIndex((item) => item.id === currentCardId));
  currentCardId = candidates[(index + 1) % candidates.length].id;
  cardFlipped = false;
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function createQuiz() {
  const available = allTerms();
  const pool = shuffle(filteredTerms().length >= 4 ? filteredTerms() : available).slice(0, 8);
  const first = pool[0] || available[0] || baseTerms[0];
  return {
    pool,
    index: 0,
    answered: false,
    selected: "",
    correctCount: 0,
    current: first,
    reverse: false,
    choices: quizChoices(first, false),
  };
}

function quizChoices(term, reverse = false) {
  const key = reverse ? "term" : "translation";
  const available = allTerms().length ? allTerms() : baseTerms;
  const others = shuffle(available.filter((item) => item.id !== term.id)).slice(0, 3);
  return shuffle([term, ...others]).map((item) => ({
    id: item.id,
    label: item[key],
  }));
}

function answerQuiz(id) {
  if (quiz.answered) return;
  quiz.selected = id;
  quiz.answered = true;
  const correct = id === quiz.current.id;
  quiz.correctCount += correct ? 1 : 0;
  markTerm(quiz.current.id, correct);
  renderQuiz();
}

function advanceQuiz() {
  const nextIndex = quiz.index + 1;
  if (nextIndex >= quiz.pool.length) {
    quiz = createQuiz();
  } else {
    quiz.index = nextIndex;
    quiz.current = quiz.pool[nextIndex];
    quiz.answered = false;
    quiz.selected = "";
    quiz.choices = quizChoices(quiz.current, quiz.reverse);
  }
  renderQuiz();
}

function categoryTag(item) {
  const color = categoryColors[item.category] || "#344054";
  return `<span class="tag" style="background:${color}">${item.category}</span>`;
}

function renderDashboard() {
  const s = stats();
  const card = getCurrentCard();
  return `
    <section class="dashboard-grid">
      ${statCard("解放済み", `${s.unlockedBase}/${s.baseTotal}`, "base terms")}
      ${statCard("今日の新語", s.newToday, "new terms")}
      ${statCard("本日の復習", s.reviewedToday, "reviews")}
      ${statCard("習得済み", s.mastered, "mastered")}
    </section>

    ${renderNewTermsPanel()}

    <section class="split-grid">
      <div class="panel">
        <div class="panel-heading">
          <div>
            <p class="panel-kicker">Review queue</p>
            <h3>今すぐ使える単語カード</h3>
          </div>
          <button class="small-button" data-action="open-flashcards" type="button">単語カードへ</button>
        </div>
        ${renderFlashcard(card, true)}
      </div>

      <div class="panel">
        <div class="panel-heading">
          <div>
            <p class="panel-kicker">Consulting moves</p>
            <h3>今日の重点</h3>
          </div>
        </div>
        <ul class="insight-list">
          <li>会議では alignment、ask、next steps をセットで押さえると締まりが出ます。</li>
          <li>分析説明では finding で止めず、implication まで言うとコンサルらしい表現になります。</li>
          <li>反論が出そうな提案は socialize、pressure-test、mitigate が便利です。</li>
          <li>進捗報告では blocker、dependency、owner を明確にすると信頼されます。</li>
        </ul>
      </div>
    </section>
  `;
}

function renderNewTermsPanel() {
  const newTerms = todayNewTerms();
  const remaining = lockedBaseTerms().length;
  if (!newTerms.length) {
    return `
      <section class="panel unlock-panel">
        <div class="panel-heading">
          <div>
            <p class="panel-kicker">Daily unlock</p>
            <h3>今日の新語はすべて解放済み</h3>
          </div>
          <span class="status-chip">残り ${remaining} 語</span>
        </div>
        <p class="unlock-note">次の日にアプリを開くと、未解放の単語があれば10語追加されます。</p>
      </section>
    `;
  }

  const chips = newTerms
    .map((item) => {
      return `
        <button class="unlock-chip" data-action="study-term" data-id="${item.id}" type="button">
          <span>${item.term}</span>
          <small>${pronunciationFor(item)}</small>
        </button>
      `;
    })
    .join("");

  return `
    <section class="panel unlock-panel">
      <div class="panel-heading">
          <div>
            <p class="panel-kicker">Daily unlock</p>
          <h3>今日解放された${newTerms.length}語</h3>
        </div>
        <span class="status-chip">残り ${remaining} 語</span>
      </div>
      <div class="unlock-grid">${chips}</div>
    </section>
  `;
}

function statCard(label, value, note) {
  return `
    <article class="stat-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <span>${note}</span>
    </article>
  `;
}

function renderFlashcard(item, compact = false) {
  if (!item) return `<div class="empty-state">条件に合う単語がありません。</div>`;
  const p = ensureProgress(item.id);
  const back = cardFlipped || compact;
  const pronunciation = pronunciationFor(item);
  const coreImage = coreImageFor(item);
  return `
    <div class="card-stage">
      <article class="flashcard">
        <div class="flashcard-header">
          ${categoryTag(item)}
          <span class="level">${item.level}</span>
          <span class="status-chip">${p.mastered ? "習得済み" : `正解 ${p.correct}/${Math.max(1, p.attempts)}`}</span>
        </div>
        <h3 class="term-title">${item.term}</h3>
        ${pronunciation ? `<p class="pronunciation">発音: ${pronunciation}</p>` : ""}
        ${back ? `<p class="translation">${item.translation}</p>` : ""}
        ${back ? `<p class="definition">${item.definition}</p>` : `<p class="definition">${item.context}</p>`}
        ${back && coreImage ? `<div class="core-image"><strong>コアイメージ</strong><span>${coreImage}</span></div>` : ""}
        ${
          back
            ? `<div class="example-box"><strong>Example</strong><span>${item.example}</span><p>${item.nuance}</p></div>`
            : ""
        }
      </article>
      <div class="action-row">
        <button class="primary-button" data-action="flip-card" type="button">${back ? "英語だけ表示" : "意味を表示"}</button>
        <button class="small-button" data-action="known-card" data-id="${item.id}" type="button">知っていた</button>
        <button class="ghost-button" data-action="again-card" data-id="${item.id}" type="button">もう一度</button>
        <button class="ghost-button" data-action="next-card" type="button">次へ</button>
      </div>
    </div>
  `;
}

function renderFlashcardsView() {
  const card = getCurrentCard();
  return `
    <section class="split-grid">
      <div class="panel">
        <div class="panel-heading">
          <div>
            <p class="panel-kicker">Flashcards</p>
            <h3>文脈で覚える単語カード</h3>
          </div>
          <span class="status-chip">${dueTerms().length} due</span>
        </div>
        ${renderFlashcard(card)}
      </div>
      <div class="panel">
        <div class="panel-heading">
          <div>
            <p class="panel-kicker">Patterns</p>
            <h3>言い換えの型</h3>
          </div>
        </div>
        <ul class="insight-list">
          <li>「課題」は problem だけでなく、pain point、constraint、blocker で使い分けます。</li>
          <li>「考え」は idea より、hypothesis、recommendation、strawman が実務的です。</li>
          <li>「重要」は important に加えて、material、critical、key を場面で選べます。</li>
          <li>「確認」は check だけでなく、validate、pressure-test、calibrate が使えます。</li>
        </ul>
      </div>
    </section>
  `;
}

function renderQuizView() {
  return `
    <section class="quiz-board" id="quizBoard">
      ${quizMarkup()}
    </section>
  `;
}

function quizMarkup() {
  const current = quiz.current || allTerms()[0];
  const prompt = quiz.reverse ? current.translation : current.term;
  const promptLabel = quiz.reverse ? "日本語に合う英語は？" : "この英語の意味は？";
  const choices = quiz.choices?.length ? quiz.choices : quizChoices(current, quiz.reverse);
  const complete = quiz.index + 1 >= quiz.pool.length && quiz.answered;
  return `
    <div class="quiz-top">
      <div>
        <p class="panel-kicker">Question ${quiz.index + 1} / ${quiz.pool.length || 1}</p>
        <h3>クライアントワーク語彙クイズ</h3>
      </div>
      <div class="action-row">
        <button class="small-button" data-action="toggle-quiz-mode" type="button">${quiz.reverse ? "日→英" : "英→日"}</button>
        <button class="ghost-button" data-action="restart-quiz" type="button">新しい問題</button>
      </div>
    </div>
    <div class="quiz-question">
      <span>${promptLabel}</span>
      <strong>${prompt}</strong>
    </div>
    <div class="choice-grid">
      ${choices
        .map((choice) => {
          const isCorrect = quiz.answered && choice.id === current.id;
          const isWrong = quiz.answered && choice.id === quiz.selected && choice.id !== current.id;
          return `<button class="choice-button ${isCorrect ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""}" data-action="answer-quiz" data-id="${choice.id}" type="button">${choice.label}</button>`;
        })
        .join("")}
    </div>
    <div class="feedback">
      ${
        quiz.answered
          ? `<strong>${quiz.selected === current.id ? "正解" : "確認ポイント"}</strong><br>${current.term} ${pronunciationFor(current) ? `(${pronunciationFor(current)})` : ""} = ${current.translation}<br>${coreImageFor(current) ? `コアイメージ: ${coreImageFor(current)}<br>` : ""}${current.example}`
          : `Score ${quiz.correctCount} / ${quiz.index}`
      }
    </div>
    ${
      quiz.answered
        ? `<button class="primary-button" data-action="advance-quiz" type="button">${complete ? "もう一度始める" : "次の問題"}</button>`
        : ""
    }
  `;
}

function renderQuiz() {
  const board = document.querySelector("#quizBoard");
  if (board) board.innerHTML = quizMarkup();
}

function renderPhrasesView() {
  const tabs = Object.keys(phraseSets)
    .map((set) => {
      return `<button class="tab-button ${set === activePhraseSet ? "is-active" : ""}" data-action="phrase-tab" data-set="${set}" type="button">${set}</button>`;
    })
    .join("");
  const cards = phraseSets[activePhraseSet]
    .map((item) => {
      return `
        <article class="phrase-card">
          <span class="level">${item.title}</span>
          <p class="phrase">${item.phrase}</p>
          <p>${item.meaning}</p>
          <button class="small-button" data-action="copy-phrase" data-phrase="${encodeURIComponent(item.phrase)}" type="button">コピー</button>
        </article>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-heading">
        <div>
          <p class="panel-kicker">Client-ready phrases</p>
          <h3>そのまま会議で使える表現</h3>
        </div>
      </div>
      <div class="tabs">${tabs}</div>
      <div class="phrase-grid">${cards}</div>
    </section>
  `;
}

function renderLibraryView() {
  const terms = filteredTerms();
  const cards = terms
    .map((item) => {
      const p = ensureProgress(item.id);
      return `
        <article class="term-card">
          <div class="term-meta">
            ${categoryTag(item)}
            <span class="level">${item.level}</span>
            <span class="status-chip">${p.mastered ? "習得済み" : `${p.correct}/${Math.max(1, p.attempts)} correct`}</span>
          </div>
          <h3>${item.term}</h3>
          ${pronunciationFor(item) ? `<p class="pronunciation">発音: ${pronunciationFor(item)}</p>` : ""}
          <p><strong>${item.translation}</strong></p>
          ${coreImageFor(item) ? `<div class="core-image"><strong>コアイメージ</strong><span>${coreImageFor(item)}</span></div>` : ""}
          <p>${item.definition}</p>
          <p class="example">${item.example}</p>
          <div class="term-actions">
            <button class="small-button" data-action="study-term" data-id="${item.id}" type="button">カードで見る</button>
          </div>
        </article>
      `;
    })
    .join("");
  return `
    <section class="panel">
      <div class="panel-heading">
        <div>
          <p class="panel-kicker">Library</p>
          <h3>${terms.length} terms</h3>
        </div>
      </div>
      <div class="term-grid">${cards || `<div class="empty-state">該当する単語がありません。</div>`}</div>
    </section>
    ${renderAddForm()}
  `;
}

function renderAddForm() {
  return `
    <section class="panel">
      <div class="panel-heading">
        <div>
          <p class="panel-kicker">Custom terms</p>
          <h3>自分の案件で出た単語を追加</h3>
        </div>
      </div>
      <form class="add-form" id="addTermForm">
        <label>英語
          <input name="term" required placeholder="例: steering committee" />
        </label>
        <label>日本語
          <input name="translation" required placeholder="例: 経営会議、ステコミ" />
        </label>
        <label>発音
          <input name="pronunciation" placeholder="例: ステアリング・コミッティ" />
        </label>
        <label>カテゴリ
          <select name="category">
            <option>Strategy</option>
            <option>Client</option>
            <option>Analytics</option>
            <option>Finance</option>
            <option>Delivery</option>
            <option>Leadership</option>
          </select>
        </label>
        <label>レベル
          <select name="level">
            <option>Core</option>
            <option>Advanced</option>
          </select>
        </label>
        <label class="full">意味
          <textarea name="definition" required rows="2" placeholder="案件の文脈でどう使うか"></textarea>
        </label>
        <label class="full">コアイメージ
          <textarea name="coreImage" rows="2" placeholder="例: 経営層が集まる判断の場"></textarea>
        </label>
        <label class="full">例文
          <textarea name="example" required rows="2" placeholder="英語の例文"></textarea>
        </label>
        <button class="primary-button" type="submit">追加する</button>
      </form>
    </section>
  `;
}

function render() {
  const titleMap = {
    dashboard: "本日の学習",
    flashcards: "単語カード",
    quiz: "クイズ",
    phrases: "実務フレーズ",
    library: "単語一覧",
  };
  viewTitle.textContent = titleMap[activeView];
  const renderers = {
    dashboard: renderDashboard,
    flashcards: renderFlashcardsView,
    quiz: renderQuizView,
    phrases: renderPhrasesView,
    library: renderLibraryView,
  };
  app.innerHTML = renderers[activeView]();
  updateDailyProgress();
}

function updateDailyProgress() {
  const s = stats();
  const percent = Math.min(100, Math.round((s.reviewedToday / DAILY_GOAL) * 100));
  document.querySelector("#dailyProgressText").textContent = `${Math.min(s.reviewedToday, DAILY_GOAL)} / ${DAILY_GOAL}`;
  document.querySelector("#dailyProgressBar").style.width = `${percent}%`;
}

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll(".filter-pill").forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    document.querySelectorAll(".filter-pill").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
    quiz = createQuiz();
    currentCardId = null;
    render();
  });
});

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value;
  quiz = createQuiz();
  currentCardId = null;
  render();
});

document.querySelector("#resetProgress").addEventListener("click", () => {
  const confirmed = window.confirm("学習進捗をリセットしますか？追加した単語は残ります。");
  if (!confirmed) return;
  progress = {};
  saveState();
  render();
});

app.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "flip-card") {
    cardFlipped = !cardFlipped;
    render();
  }
  if (action === "known-card") {
    markTerm(button.dataset.id, true);
    nextCard();
    render();
  }
  if (action === "again-card") {
    markTerm(button.dataset.id, false);
    nextCard();
    render();
  }
  if (action === "next-card") {
    nextCard();
    render();
  }
  if (action === "open-flashcards") {
    setView("flashcards");
  }
  if (action === "study-term") {
    currentCardId = button.dataset.id;
    setView("flashcards");
  }
  if (action === "answer-quiz") {
    answerQuiz(button.dataset.id);
  }
  if (action === "advance-quiz") {
    advanceQuiz();
  }
  if (action === "restart-quiz") {
    quiz = createQuiz();
    renderQuiz();
  }
  if (action === "toggle-quiz-mode") {
    quiz.reverse = !quiz.reverse;
    quiz.answered = false;
    quiz.selected = "";
    quiz.choices = quizChoices(quiz.current, quiz.reverse);
    renderQuiz();
  }
  if (action === "phrase-tab") {
    activePhraseSet = button.dataset.set;
    render();
  }
  if (action === "copy-phrase") {
    const phrase = decodeURIComponent(button.dataset.phrase);
    await navigator.clipboard?.writeText(phrase);
    button.textContent = "コピー済み";
    setTimeout(() => {
      button.textContent = "コピー";
    }, 1000);
  }
});

app.addEventListener("submit", (event) => {
  if (event.target.id !== "addTermForm") return;
  event.preventDefault();
  const form = new FormData(event.target);
  const term = String(form.get("term")).trim();
  if (!term) return;
  const id = `custom-${Date.now()}`;
  customTerms.push({
    id,
    term,
    translation: String(form.get("translation")).trim(),
    pronunciation: String(form.get("pronunciation")).trim(),
    coreImage: String(form.get("coreImage")).trim(),
    category: String(form.get("category")),
    level: String(form.get("level")),
    definition: String(form.get("definition")).trim(),
    example: String(form.get("example")).trim(),
    context: "自分で追加した案件語彙",
    nuance: "実案件の文脈に合わせて復習できます。",
  });
  saveState();
  currentCardId = id;
  event.target.reset();
  render();
});

render();
