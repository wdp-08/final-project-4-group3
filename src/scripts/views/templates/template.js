const cardSoal = (data) => `
<div id="nomer_soal">${data.category}</div>
<div class="card-body user-select-none bg-green-me text-white fs-4">${data.question}</div>



`;

const cardTemplateAnswers = (data) => `

    <div class="col-lg-6">
        <label class="border border-2 rounded mb-3">
            <input type="radio" name="product" class="card-input-element d-none" value="${data}" />
            <div class="panel panel-default card-input p-2">
                <div class="panel-heading">${data}</div>
            </div>
        </label>
    </div>




`;

export { cardSoal, cardTemplateAnswers };
