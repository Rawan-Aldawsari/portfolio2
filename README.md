# Portfolio UI Review Assistant

## فكرة المشروع

Portfolio UI Review Assistant هو مشروع صغير يساعد على مراجعة واجهات مواقع الـPortfolio من ناحية التصميم، Responsive Design، Accessibility، Usability، Typography، وSpacing.

تم تصميم المشروع ليكون مثالًا بسيطًا على استخدام وكيل Codex مع Skill مخصصة لمراجعة واجهات Front-End.

## طريقة التشغيل

1. افتح مجلد المشروع.
2. افتح ملف `review.html` في المتصفح.
3. اكتب اسم الـPortfolio أو المشروع.
4. اختر نوع المراجعة.
5. اضغط **Review UI**.
6. ستظهر نتائج المراجعة مرتبة حسب الأولوية.

## دور الوكيل

يستخدم المشروع وكيلًا مخصصًا باسم `frontend-reviewer`، ودوره تحليل ملفات الواجهة، مراجعة جودة الـUI، اقتراح أو تنفيذ التصحيحات المطلوبة، ثم التحقق من أن الوظيفة الأساسية ما زالت تعمل.

إعداد الوكيل موجود في:

`agents/frontend-reviewer.toml`

## دور الـSkill

يستخدم الوكيل Skill باسم `frontend-ui-review` الموجودة في:

`skills/frontend-ui-review/SKILL.md`

وتغطي المهارة مراجعة:

- HTML structure
- CSS
- Responsive Design
- Accessibility
- Usability
- Typography
- Spacing
- Visual Consistency

## تجربة المشروع

التجربة الأساسية هي إدخال اسم `Personal Portfolio Website` ثم الضغط على `Review UI`، وبعدها تظهر مجموعة من الملاحظات والتوصيات المصنفة حسب الأولوية.

## التحقق

تم تصميم المشروع بحيث يمكن تشغيل الوظيفة الأساسية محليًا مباشرة من المتصفح، ثم مراجعة الواجهة وتصحيح أي مشكلة وإعادة تجربة زر `Review UI`.

> ملاحظة: تشغيل الوكيل نفسه واختبار استدعاء الـSkill يحتاج بيئة Codex. عند توفر Codex يمكن تنفيذ دورة Plan → Build → Review → Correct → Verify وتحديث هذا الملف بنتيجة الاختبار الفعلية.
