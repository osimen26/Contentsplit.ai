# Chat Architecture & Interface Design

> **Rule ID:** `chat-architecture`
> **Status:** Active
> **Last Updated:** 2026-04-15
> **Context:** Replaces the legacy "dashboard split-panel" flow for content creation.

## 1. Core Paradigm
ContentSplit's primary interaction model is a conversational AI chat session (inspired by Claude AI). 
Do **NOT** build static, form-heavy dashboards for generative workflows. Instead, use state-machine-driven conversational patterns.

## 2. Layout Structure & UI Description
The entire user interface is stripped down to maximize focus on the iterative content generation process. 

### Global Layout (`ClaudeLayout.tsx`)
- **Left Sidebar**: Contains a grouped historical list of conversions (Today, Previous 7 Days) driven dynamically by API data. It has a sticky bottom footer containing the active `User` profile avatar/name and a Settings link. There are NO massive utility buttons or credit widgets here.
- **Main Chat Area**: The Right pane acts exclusively as an infinite vertical canvas for the active conversation.

### The Chat Stream (`ContentCreationPage.tsx`)
- **Empty State**: Displays an inviting icon with a "What do you want to adapt?" prompt.
- **Message Bubbles**: The conversation flows linearly downward.
  - **User Bubbles**: Rendered on the right side. Uses a `--sys-color-primary-98` background, no borders. The avatar uses `--sys-color-primary-90`.
  - **Assistant Bubbles**: Rendered on the left side. Uses a transparent background with a 1px `--sys-color-border-tertiary` outline. The avatar uses `--sys-color-neutral-90`.
- **Chat Input (`ChatInput.tsx`)**: A floating input bar permanently anchored to the bottom of the viewport using a linear-gradient fade. It uses `crypto.randomUUID()` to manage state uniquely.

## 3. Conversational State Machine (Implementation Details)
The core content engine runs on an array of `ChatMessage` objects representing the UI state.
```typescript
interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  type: 'text' | 'preferences' | 'loading' | 'result'
  text?: string
}
// State hook
const [messages, setMessages] = useState<ChatMessage[]>([])
```

Follow this sequence for implementing conversational workflows:
1. **Input Phase:** User posts raw text. The UI pushes: `{ role: 'user', type: 'text', text: input }`
2. **Preference Phase:** The AI instantly pushes: `{ role: 'assistant', type: 'preferences' }`. This triggers the inline render of `PlatformSelector` and `ToneSelector` inside the AI's bubble.
3. **Execution Phase:** Upon clicking Generate, filter out the `preferences` bubble, and push a `{ role: 'assistant', type: 'loading' }` bubble. Trigger `useGenerateContent(input_text, tone_mode, platforms)`.
4. **Resolution Phase:** Once the API resolves, filter out the `loading` bubble and push a `{ role: 'assistant', type: 'result' }` bubble. This renders `GeneratedContent` and `RegenerationControls`.

## 4. Usage Guidelines
When AI agents or developers modify or interact with this Chat Architecture, apply these guidelines:
1. **Inline Tooling:** If a new feature requires user input (e.g. uploading a document, selecting secondary parameters), embed that directly *inside* an AI chat bubble. Do not create modal pop-ups or sidebar flyouts.
2. **Keep History Pure:** Do not mutate old messages. If a user utilizes `RegenerationControls` (like "Make Shorter"), handle it as a new network request and append a new `loading` -> `result` cycle at the bottom of the array. The user should be able to scroll up to see their first draft.
3. **Immutability of the Input Dock:** The `ChatInput.tsx` at the bottom of the screen should never be obscured. All dynamic UI happens within the scrolled chat feed pane.
4. **Loading States:** Any asynchronous operation longer than 300ms should render an inline AI bubble with a `loading` type to mimic realistic AI typing delays before rendering the final payload.
