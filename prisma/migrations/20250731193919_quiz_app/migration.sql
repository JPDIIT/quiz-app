-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "currentScore" DECIMAL(65,30) NOT NULL,
    "averageScore" DECIMAL(65,30) NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scores" (
    "id" SERIAL NOT NULL,
    "score" DECIMAL(65,30) NOT NULL,
    "starttime" TIMESTAMP(3) NOT NULL,
    "endtime" TIMESTAMP(3) NOT NULL,
    "attempt" INTEGER NOT NULL,

    CONSTRAINT "Scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rel_Quiz_Scores" (
    "scoreId" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,

    CONSTRAINT "Rel_Quiz_Scores_pkey" PRIMARY KEY ("scoreId")
);

-- CreateTable
CREATE TABLE "QuestionBank" (
    "id" SERIAL NOT NULL,
    "q_num" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "correct_answer" TEXT NOT NULL,

    CONSTRAINT "QuestionBank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rel_Quiz_Quest" (
    "questId" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,

    CONSTRAINT "Rel_Quiz_Quest_pkey" PRIMARY KEY ("questId")
);

-- CreateTable
CREATE TABLE "Responses" (
    "id" SERIAL NOT NULL,
    "response" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,

    CONSTRAINT "Responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rel_Response_Question" (
    "responseId" SERIAL NOT NULL,
    "questId" INTEGER NOT NULL,

    CONSTRAINT "Rel_Response_Question_pkey" PRIMARY KEY ("responseId")
);
