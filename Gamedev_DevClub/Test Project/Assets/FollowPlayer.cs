using UnityEngine;

public class FollowPlayer : MonoBehaviour
{

    public Transform player;

    // Update is called once per frame
    void Update()
    {
        transform.position = player.position + new Vector3(0, 2, -10);
    }
}
