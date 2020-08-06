(function () {
    var dot = document.getElementById('dot');
    var number = document.getElementById('number');
    var title = document.getElementById('title');
    var answers = document.getElementById('answers');
    var answerEls = document.querySelectorAll('.answer');


    var questions = document.interview;

    var questionNum = 1;

    function setup() {
        window.addEventListener('hashchange', onHash);
        answerEls.forEach(function (answerEl) {
            answerEl.addEventListener('click', onClick);
        });
        onHash();
    }

    function load(num) {
        console.log('questions.load', num);
        var question = questions[num - 1];
        number.innerText = `Question ${num}`;
        title.innerText = question.title;
        questionNum = num;
    }

    function onClick(e) {
        var num = Number(e.target.getAttribute('data-num'));
        console.log('questions.answer', questionNum, '=', num);
        questions[questionNum - 1].answer = num;
        e.target.blur();
        updateChart();
        if (questionNum < questions.length) {
            answers.style.display = 'flex';
            window.location.hash = questionNum + 1;
        } else {
            answers.style.display = 'none';
            number.innerText = `Complete!`;

            var results = updateChart();
            title.innerHTML =
                'All questions answered<br /><br /><i>('
                    .concat((results['sweatiness'] / results['sweatiness-scale']).toFixed(2).toString())
                    .concat(', ')
                    .concat((results['loyalist'] / results['loyalist-scale']).toFixed(2).toString())
                    .concat(')</i>');


        }
    }



    function onHash() {
        var num = Number(window.location.hash.slice(1));
        if (num) {
            load(num);
        } else {
            reset();
            updateChart();
            load(1);
        }
    }

    function reset() {
        answers.style.display = 'flex';
        questions.forEach(function (question) {
            delete question.answer;
        });
        //console.log(questions);
    }

    function updateChart() {
        var results = {
            sweatiness: 0,
            loyalist: 0,
            "sweatiness-scale": 0,
            "loyalist-scale": 0
        };
        questions.forEach(function (question, index) {
            if (question.answer) {
                results[question.type] = results[question.type] + question.answer * question.weight;
                results[question.type.concat('-scale')] += Math.abs(question.weight);
            }
        });
        //console.log('results', results);
        var left = (((results['sweatiness-scale'] > 0.0 ? (results['sweatiness'] / results['sweatiness-scale']) : 0.0) + 1) / 2);
        var top = 1 - (((results['loyalist-scale'] > 0.0 ? (results['loyalist'] / results['loyalist-scale']) : 0.0) + 1) / 2);

        var op = document.getElementById('output');

        var width = parseFloat(op.clientWidth.toFixed());
        var height = parseFloat(op.clientHeight.toFixed());

        var offsetx = 40.0 / width;
        var offsety = 40.0 / height;

        left = left * ((width - 80) / width) + offsetx;
        top = top * ((height - 80) / height) + offsety;

        dot.style.left = (left * 100) + '%';
        dot.style.top = (top * 100) + '%';
        return results;
    }

    setup();
}());
