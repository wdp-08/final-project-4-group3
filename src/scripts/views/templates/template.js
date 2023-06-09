const cardSoal = (data, antrianQuestion, lastQuestion) => `
<div id="nomer_soal" class="py-3">${data.category} | ${antrianQuestion + 1} / ${lastQuestion + 1}</div>
<div class="card-body user-select-none bg-green-me text-white fs-4">${data.question}</div>



`;

const cardTemplateAnswers = (data) => `

    <div class="col-lg-6">
        <label class="border border-2 rounded mb-3">
            <input type="radio" name="choices" class="card-input-element d-none" value="${data}" />
            <div class="panel panel-default card-input p-2">
                <div class="panel-heading">${data}</div>
            </div>
        </label>
    </div>




`;

export { cardSoal, cardTemplateAnswers };
