# 📚 Reading List — Foundational Papers & Essays

A personal, curated reading list of influential papers and essays worth knowing as a
full-stack AI engineer — weighted toward my trajectory: **backend, distributed systems,
databases, and applied AI**.

- Boxes are unchecked on purpose — this is a **to-read tracker**, not a claim I've read them. I tick a box once I've genuinely read it.
- Almost everything here is **free** (arXiv / author sites / USENIX / ACM open copies). "Attention Is All You Need" is NeurIPS, and most of the systems classics are ACM/USENIX — not IEEE — but they're the papers that actually shaped the field.
- If a link ever rots, the **title + year** is enough to find the paper.

> **How this ties into my portfolio:** once I've actually read one, it graduates into
> [The Lab](./src/data/lab.json) with a `paper` badge — keeping that section honest while
> steadily upgrading it from "watches videos" to "reads the foundational work."

---

## ★ Start here

The five I'd read first — highest signal, most readable, most relevant.

- [ ] **Attention Is All You Need** · Vaswani et al., 2017 · [arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762)
  <br/>The Transformer. The foundation under every LLM I touch.
- [ ] **Dynamo: Amazon's Highly Available Key-Value Store** · DeCandia et al., 2007 · [PDF](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf)
  <br/>Eventual consistency, quorums, consistent hashing — the intellectual parent of Aerospike/Cassandra.
- [ ] **In Search of an Understandable Consensus Algorithm (Raft)** · Ongaro & Ousterhout, 2014 · [PDF](https://raft.github.io/raft.pdf)
  <br/>The *most readable* consensus paper. Read this before touching Paxos.
- [ ] **The Log-Structured Merge-Tree (LSM-Tree)** · O'Neil et al., 1996 · [PDF](https://www.cs.umb.edu/~poneil/lsmtree.pdf)
  <br/>The write-optimized structure behind RocksDB, Cassandra, and most modern storage engines.
- [ ] **Retrieval-Augmented Generation** · Lewis et al., 2020 · [arxiv.org/abs/2005.11401](https://arxiv.org/abs/2005.11401)
  <br/>The canonical RAG paper — maps directly onto my pgvector / Chroma work.

---

## 🤖 AI / LLMs

- [ ] **Attention Is All You Need** · Vaswani et al., 2017 · [arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762)
  <br/>The Transformer architecture.
- [ ] **Retrieval-Augmented Generation for Knowledge-Intensive NLP** · Lewis et al., 2020 · [arxiv.org/abs/2005.11401](https://arxiv.org/abs/2005.11401)
  <br/>Grounding LLMs in retrieved context — the RAG blueprint.
- [ ] **LoRA: Low-Rank Adaptation of Large Language Models** · Hu et al., 2021 · [arxiv.org/abs/2106.09685](https://arxiv.org/abs/2106.09685)
  <br/>Parameter-efficient fine-tuning; relevant to the OpenAI fine-tuning work at Astro.
- [ ] **Chain-of-Thought Prompting Elicits Reasoning in LLMs** · Wei et al., 2022 · [arxiv.org/abs/2201.11903](https://arxiv.org/abs/2201.11903)
  <br/>Why "let's think step by step" measurably improves reasoning.
- [ ] **Language Models are Few-Shot Learners (GPT-3)** · Brown et al., 2020 · [arxiv.org/abs/2005.14165](https://arxiv.org/abs/2005.14165)
  <br/>The scaling-laws moment that reframed what LLMs could do.

---

## 🌐 Distributed Systems & Backend

- [ ] **Dynamo: Amazon's Highly Available Key-Value Store** · DeCandia et al., 2007 · [PDF](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf)
  <br/>Availability over consistency, done deliberately.
- [ ] **In Search of an Understandable Consensus Algorithm (Raft)** · Ongaro & Ousterhout, 2014 · [PDF](https://raft.github.io/raft.pdf)
  <br/>Leader election and replicated logs, explained so they stick.
- [ ] **MapReduce: Simplified Data Processing on Large Clusters** · Dean & Ghemawat, 2004 · [Google Research](https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/)
  <br/>The paper that launched a decade of big-data infrastructure.
- [ ] **Kafka: a Distributed Messaging System for Log Processing** · Kreps et al., 2011 · [PDF](https://notes.stephenholiday.com/Kafka.pdf)
  <br/>Where the Kafka I already use came from — the log as a first-class abstraction.
- [ ] **Time, Clocks, and the Ordering of Events in a Distributed System** · Lamport, 1978 · [PDF](https://lamport.azurewebsites.net/pubs/time-clocks.pdf)
  <br/>How to reason about "before" and "after" when there's no global clock.

---

## 🗄️ Databases & Storage

- [ ] **The Log-Structured Merge-Tree (LSM-Tree)** · O'Neil et al., 1996 · [PDF](https://www.cs.umb.edu/~poneil/lsmtree.pdf)
  <br/>Write-optimized storage; the engine behind modern NoSQL and embedded KV stores.
- [ ] **Spanner: Google's Globally-Distributed Database** · Corbett et al., 2012 · [Google Research](https://research.google/pubs/spanner-googles-globally-distributed-database/)
  <br/>TrueTime and externally-consistent global transactions — pairs well with multi-region design.

---

## 🧭 Timeless Engineering Essays

Short, high-leverage reads that change how you think about building software.

- [ ] **On the Criteria To Be Used in Decomposing Systems into Modules** · Parnas, 1972 · [PDF](https://www.win.tue.nl/~wstomv/edu/2ip30/references/criteria_for_modularization.pdf)
  <br/>The original, still-best argument for encapsulation and modular boundaries.
- [ ] **Out of the Tar Pit** · Moseley & Marks, 2006 · [PDF](https://curtclifton.net/papers/MoseleyMarks06a.pdf)
  <br/>On taming complexity and minimizing state — will change how you design systems.
- [ ] **No Silver Bullet: Essence and Accident in Software Engineering** · Brooks, 1986 · [PDF](https://worrydream.com/refs/Brooks-NoSilverBullet.pdf)
  <br/>Essential vs. accidental complexity — why there's no magic productivity 10x.

---

_Suggested cadence: one paper a month. Read it, tick the box, jot a two-line takeaway, and
promote it into The Lab._
