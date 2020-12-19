using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ML;
using ChattyCathy.DataModels;

namespace ChattyCathy.Controllers
{
    [Route("chatroom/predict")]
    [ApiController]
    public class PredictController : ControllerBase
    {
        private readonly PredictionEnginePool<SentimentData, SentimentPrediction> _predictionEnginePool;

        public PredictController(PredictionEnginePool<SentimentData, SentimentPrediction> predictionEnginePool)
        {
            _predictionEnginePool = predictionEnginePool;
        }

        [HttpPost]
        public IActionResult Post([FromBody] SentimentData input)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            SentimentPrediction prediction = _predictionEnginePool.Predict(modelName: "SentimentAnalysisModel", example: input);

            string sentiment = Convert.ToString(prediction.Prediction);

            return Ok(sentiment);
        }
    }
}
