namespace ChatConnectAPI.Services
{
    public class RandomIndex
    {
        private Random random = new Random();

        public int GetRandomIndex(int numberElements)
        {
            return random.Next(0,numberElements);
        }
    }
}
