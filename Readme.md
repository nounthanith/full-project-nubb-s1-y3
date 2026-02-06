# Vue 3 Core Concepts – Quick Guide 🚀

ឯកសារនេះសម្រាប់ចងចាំ Vue 3 Features សំខាន់ៗ ឲ្យងាយយល់ និងអាចមើលរំលឹកបានលឿន។

## 🔹 ref – Reactive Variable

`ref` ប្រើសម្រាប់បង្កើត Reactive Variable

មានន័យថា បើតម្លៃវាប្រែប្រួល → UI នឹង Update ស្វ័យប្រវត្តិ

### Example

ប្រើសម្រាប់ Count ++

```javascript
const count = ref(0)

count.value++
```

### Rule

- **JS** → `count.value`
- **Template** → `{{ count }}`

## 🔹 defineEmits – Child ➜ Parent

`defineEmits` ប្រើសម្រាប់ Child Component ផ្ញើ Event ទៅ Parent

មានន័យថា Component កូនអាច "ជូនដំណឹង" មេថា មាន Action កើតឡើង

### Example Idea

- Button Click
- Submit Form
- Notification Trigger

## 🔹 defineProps – Parent ➜ Child

`defineProps` ប្រើសម្រាប់ Parent ផ្ញើ Data ទៅ Child

មានន័យថា មេ → កូន

### Example Idea

- ផ្ញើ Name
- ផ្ញើ Age
- ផ្ញើ Product Data

## 🔹 Teleport – Move UI Position

Teleport ជា Feature មួយក្នុង Vue

ប្រើសម្រាប់ ផ្លាស់ទី HTML Element ទៅទីតាំងផ្សេងក្នុង DOM

- Component នៅកន្លែងមួយ
- តែ UI បង្ហាញនៅកន្លែងផ្សេង

### Common Use

- Modal / Popup
- Alert
- Tooltip
- Notification

## 🔹 Transition – UI Animation

Transition ជា Component មួយក្នុង Vue

ប្រើសម្រាប់ Animation / Effect ពេល Element បង្ហាញ ឬ បាត់

### Behavior

- **Enter** → ពេលបង្ហាញ
- **Leave** → ពេលបាត់

Smooth Animation មិនឲ្យបាត់ភ្លាមៗ

### Common Use

- Fade In / Fade Out
- Slide Dropdown
- Modal Animation

## 🧠 Quick Memory Rules

| Feature | Direction | Purpose |
|---------|-----------|---------|
| ref | Local | Reactive Variable |
| defineProps | Parent → Child | Send Data |
| defineEmits | Child → Parent | Send Event |
| Teleport | UI Move | Change DOM Position |
| Transition | UI Effect | Animation |

---

**Vue 3 គំនិតសំខាន់គឺ Reactive + Component Communication + Smooth UI ✨**
