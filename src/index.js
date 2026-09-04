const express = require("express");\nconst cors = require("cors");\nconst app = express();\napp.use(cors());\napp.use(express.json());\nconst members = [
  { id: 1, name: "Sample Member", title: "Industry Leader", company: "Ewala Co.", industry: "Manufacturing", bio: "Sample bio" }
];\napp.get("/api/members", (req, res) => res.json(members));\nconst port = process.env.PORT || 4000;\napp.listen(port, () => console.log(`Backend running on port ${port}`));
