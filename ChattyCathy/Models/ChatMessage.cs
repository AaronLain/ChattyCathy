using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChattyCathy.Models
{
    public class ChatMessage
    {
        public int id { get; set; }

        public string Content { get; set; }

        public int UserId { get; set; }

        public DateTime Date { get; set; }
    }
}
