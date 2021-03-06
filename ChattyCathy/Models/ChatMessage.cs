﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChattyCathy.Models
{
    public class ChatMessage
    {
        public int MessageId { get; set; }

        public string UserName { get; set; }

        public string Content { get; set; }

        public string UserId { get; set; }

        public int Sentiment { get; set; }

        public DateTime Date { get; set; }
    }
}
